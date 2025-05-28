const mongoose = require('mongoose');
const Tickets = require('./tickets.js')
const User = require('./Users.js')

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
        required:true
    },
    vipQuantity: {
        type: Number,
        required:true
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
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    messages: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Order', TicketOrderSchema);
