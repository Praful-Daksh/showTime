const mongoose = require('mongoose');
const Tickets = require('./tickets.js')

const TicketOrderSchema = new mongoose.Schema({
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:Tickets
    },
    classicQuantity: {
        type: Number,
        default: 0
    },
    vipQuantity: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Order', TicketOrderSchema);
