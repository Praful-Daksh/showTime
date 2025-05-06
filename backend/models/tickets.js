const mongoose = require('mongoose')
const Event = require('./events.js')

const TicketSchema = new mongoose.Schema({
    ticketName:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    eId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Event
    },
    showCity:{
        type:String,
    },
    showDate:{
        type:Date
    },
    showName:{
        type:String
    },
    showVenue:{
        type:String
    },
    sold:{
        type:Number,
        default:0
    },
    ticketTypes:{
        type:Array,
        default:[]
    },
    lastDate:{
        type:Date
    },
    vipPrice:{
        type:Number
    },
    vipQuantity:{
        type:Number
    },
    vipSold:{
        type:Number,
        default:0
    },
    description:{
        type:String
    },
});
const Ticket = mongoose.model('Tickets',TicketSchema);
module.exports = Ticket;