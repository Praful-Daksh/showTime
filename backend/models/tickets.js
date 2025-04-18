const mongoose = require('mongoose')
const Event = require('./events.js')

const TicketSchema = new mongoose.Schema({
    limit:{
        type:Number
    },
    price:{
        type:Number
    },
    validity:{
        type:Date
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
    }
});
const Ticket = mongoose.model('Tickets',TicketSchema);
module.exports = Ticket;