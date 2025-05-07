const mongoose = require('mongoose');
const User  = require('./Users.js');

const EventSchema = new mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:Date
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    description:{
        type:String
    },
    city:{
        type:String
    },
    venue:{
        type:String
    },
    access:{
        type:String,
    },
    publish:{
        type:Boolean,
        default:false,
    },
    category:{
        type:String
    }
});
const Event = mongoose.model('event',EventSchema);
module.exports = Event;