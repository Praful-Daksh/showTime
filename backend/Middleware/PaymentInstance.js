const Razorpay = require('razorpay')

const instance = new Razorpay({
    key_id: process.env.RZRPY_KEY,
    key_secret:process.env.RZRPY_SECRET
});


module.exports = instance;