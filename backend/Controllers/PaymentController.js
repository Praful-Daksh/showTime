const instance = require('../Middleware/PaymentInstance.js');
const crypto = require('crypto');
const Order = require('../models/Order.js');
const mongoose = require('mongoose')
const Ticket = require('../models/tickets.js');
const User = require('../models/Users.js')
const Event = require('../models/events.js')

const createOrder = async (req, res) => {
    try {
        const { amount, classicQuantity, vipQuantity, showId } = req.body;
        const ticket = await Ticket.findOneAndUpdate(
            {
                _id: showId,
                available: { $gte: classicQuantity },
                vipAvailable: { $gte: vipQuantity }
            },
            {
                $inc: {
                    available: -classicQuantity,
                    reserved: +classicQuantity,
                    vipAvailable: -vipQuantity,
                    vipReserved: +vipQuantity
                }
            },
            { new: true }
        );

        if (!ticket) {
            return res.status(400).json({
                success: false,
                message: "Insufficient tickets available"
            });
        }
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
            totalAmount: amount,
            user: req.user.id
        });

        await ticketOrder.save();

        res.status(200).json({ success: true, order });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Order creation failed' });
    }
};





const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing required payment parameters"
            });
        }

        const hmac = crypto.createHmac('sha256', process.env.RZRPY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        const ticketOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (!ticketOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (generated_signature !== razorpay_signature) {
            await Ticket.findOneAndUpdate(
                { _id: ticketOrder.showId },
                {
                    $inc: {
                        reserved: -ticketOrder.classicQuantity,
                        available: ticketOrder.classicQuantity,
                        vipReserved: -ticketOrder.vipQuantity,
                        vipAvailable: ticketOrder.vipQuantity
                    }
                }
            );
            console.log('Signature mismatch:', {
                generated: generated_signature,
                received: razorpay_signature
            });
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature. Reserved tickets released."
            });
        }

        if (ticketOrder.paymentVerified) {
            return res.status(200).json({
                success: true,
                message: "Payment already verified"
            });
        }
        const ticket = await Ticket.findOneAndUpdate(
            {
                _id: ticketOrder.showId,
                reserved: { $gte: ticketOrder.classicQuantity },
                vipReserved: { $gte: ticketOrder.vipQuantity }
            },
            {
                $inc: {
                    reserved: -ticketOrder.classicQuantity,
                    sold: ticketOrder.classicQuantity,
                    vipReserved: -ticketOrder.vipQuantity,
                    vipSold: ticketOrder.vipQuantity
                }
            },
            { new: true }
        );

        if (!ticket) {
            return res.status(400).json({
                success: false,
                message: "Reserved tickets not found or insufficient"
            });
        }

        const event = await Event.findById(ticket.eId);
        if (event) {
            const organizer = await User.findById(event.user);
            if (organizer) {
                organizer.revenueClassic += ticket.price * ticketOrder.classicQuantity;
                organizer.revenueVip += ticket.vipPrice * ticketOrder.vipQuantity;
                organizer.ticketSold += ticketOrder.classicQuantity + ticketOrder.vipQuantity;
                await organizer.save();
            }
        }

        ticketOrder.paymentVerified = true;
        ticketOrder.razorpay_payment_id = razorpay_payment_id;
        await ticketOrder.save();

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });

    } catch (error) {
        console.error("Payment verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};





const paymentStatus = async (req, res) => {
    const { orderId } = req.query;
    try {
        const ticketOrder = await Order.findOne({ razorpayOrderId: orderId })
            .populate('showId', 'title date time venue');

        if (!ticketOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (ticketOrder.paymentVerified) {
            return res.status(200).json({
                success: true,
                message: "Payment verified",
                orderDetails: {
                    totalTickets: ticketOrder.classicQuantity + ticketOrder.vipQuantity,
                    totalAmount: ticketOrder.totalAmount,
                    classicTickets: ticketOrder.classicQuantity,
                    vipTickets: ticketOrder.vipQuantity
                }
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "Payment verification pending"
            });
        }
    } catch (error) {
        console.error('Payment status error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



const cancelOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const ticketOrder = await Order.findOne({ razorpayOrderId: orderId });

        if (!ticketOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (ticketOrder.paymentVerified) {
            return res.status(400).json({
                success: false,
                message: "Cannot cancel a verified order"
            });
        }

        await Ticket.findOneAndUpdate(
            { _id: ticketOrder.showId },
            {
                $inc: {
                    reserved: -ticketOrder.classicQuantity,
                    available: ticketOrder.classicQuantity,
                    vipReserved: -ticketOrder.vipQuantity,
                    vipAvailable: ticketOrder.vipQuantity
                }
            }
        );

        await Order.deleteOne({ razorpayOrderId: orderId });

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully"
        });
    } catch (error) {
        console.error("Cancel order error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

}





module.exports = {
    createOrder,
    verifyOrder,
    paymentStatus,
    cancelOrder
}