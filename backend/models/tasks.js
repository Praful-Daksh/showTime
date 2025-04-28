const mongoose = require('mongoose');
const Event  = require('./events')

const TodoSchema = new mongoose.Schema({
    task:{
        type:String
    },
    eId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Event
    }
});

const Tasks = mongoose.model('tasks',TodoSchema);

module.exports = Tasks;