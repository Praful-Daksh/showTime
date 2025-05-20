const instance = require('../Middleware/PaymentInstance.js');
const crypto = require('crypto');
const Order = require('../models/Order.js');
const mongoose = require('mongoose')
const Ticket = require('../models/tickets.js');

const createOrder = async (req, res) => {
    try {
        const { amount, classicQuantity, vipQuantity, showId } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR"
        };

        const order = await instance.orders.create(options);

        const ticketOrder = new Order({
            razorpayOrderId: order.id,
            showId,
            classicQuantity,
            vipQuantity,
            totalAmount: amount
        });

        await ticketOrder.save();

        res.status(200).json({ success: true, order });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Order creation failed' });
    }
};





const verifyOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RZRPY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    try {
        const ticketOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (!ticketOrder || ticketOrder.paymentVerified) {
            return res.status(404).json({ success: false, message: "Order not found or already verified" });
        }

        const ticket = await Ticket.findById(ticketOrder.showId);
        if (!ticket) {
            return res.status(404).json({ success: false, message: "Show not found" });
        }

        ticket.quantity -= ticketOrder.classicQuantity;
        ticket.vipQuantity -= ticketOrder.vipQuantity;
        ticket.sold += ticketOrder.classicQuantity;
        ticket.vipSold += ticketOrder.vipQuantity;

        await ticket.save();

        ticketOrder.paymentVerified = true;
        await ticketOrder.save();

        return res.redirect(`https://show-time-six.vercel.app/payment/success?ref=${razorpay_payment_id}`);

    } catch (error) {
        console.error("Payment verification error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports = {
    createOrder,
    verifyOrder
}