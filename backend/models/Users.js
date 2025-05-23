const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    revenueClassic:{
        type:Number,
        default:0
    },
    revenueVip:{
        type:Number,
        default:0
    },
    ticketSold:{
        type:Number,
        default:0
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User