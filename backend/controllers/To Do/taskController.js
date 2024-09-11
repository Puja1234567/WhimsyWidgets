import TaskModel from "../../models/Todo/task.js";
import nodemailer from "nodemailer";
import cron from "node-cron";

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

export default  class TaskControllers{


sendReminder = (task)=>{
    const mailOptions={
        from: process.env.EMAIL_USER,
        to: task.email,
        subject:"Task Reminder",
        text:`You have a task ${task.tasks} scheduled at ${task.time} on ${task.date}`,
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Email sent:'+info.response);
        }
    })
}

 scheduleReminder=(task)=>{
    const taskTime = new Date(`${task.date}T${task.time}`);
    const reminderTime =new Date(taskTime.getTime()-30*60000);
    cron.schedule(`${reminderTime.getMinutes()} ${reminderTime.getHours()} ${reminderTime.getDate()} ${reminderTime.getMonth()+1} *`,()=>{
        this.sendReminder(task); //chatgpt se this dot
    })
}

createTask=async(req,res)=>{
    const{date,time,tasks,email}=req.body;
    try{
        const newTask =new TaskModel({date,time,tasks,email});
        await newTask.save();
        if(date && time){
            this.scheduleReminder(newTask);
        }
        res.status(201).json(newTask);
    }catch(error){
        res.status(500).json({error:"Error creating task"})
    }
};
getTasks=async(req,res)=>{
    try{
        const tasks=await TaskModel.find();
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({error:"Error fetching tasks"})
    }
}
deleteTask=async(req,res)=>{
    const id = req.params.id;
    try{
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({message:'Task deleted backend'});
    }catch(error){
        console.log("error deleting task backend",error)
        res.status(500).json({error:'Error deleting task backend'});
    }
}
toggleTaskCompletion = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await TaskModel.findById(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      task.completed = !task.completed;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      console.log('Error toggling task completion:', error);
      res.status(500).json({ error: 'Error toggling task completion' });
    }
  };

}
