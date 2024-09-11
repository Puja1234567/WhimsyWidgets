import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    date:{type:String,required:true},
    time:{type:String,required:true},
    tasks:{type:String,required:true},
    email:{type:String,required:true},
    completed:{type:Boolean,default:false},

},
 {timestamps: true}
);

var TaskModel = mongoose.model('Task',taskSchema);
export default TaskModel;




