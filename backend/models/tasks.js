import mongoose from 'mongoose';
import Event from './events.js';

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
export default Tasks;