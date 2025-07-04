const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    userData: {
        name: String,
        email: String,
        password: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
});

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP