const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const PaymentRouter = express.Router();

const instance = new Razorpay({
    key_id: process.env.RZRPY_KEY,
    key_secret:process.env.RZRPY_SECRET
});

PaymentRouter.post('/orders', async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ success: false, error: "Amount is required" });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt :`show_rcpt_${Math.floor(Math.random()*10000)}`
        };

        const order = await instance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order:", error.message || error);
        res.status(500).json({ success: false, error: "Unable to create order" });
    }
});

PaymentRouter.post('/verify', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RZRPY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    }
});

module.exports = PaymentRouter;
