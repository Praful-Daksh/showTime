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
    }
});
const Event = mongoose.model('event',EventSchema);
module.exports = Event;