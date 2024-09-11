import express from "express";
import TaskControllers from "../controllers/To Do/taskController.js";


const taskRouter = express.Router();
const taskController = new TaskControllers();

taskRouter.post('/',(req,res)=>taskController.createTask(req,res));
taskRouter.get('/',(req,res)=>taskController.getTasks(req,res));
taskRouter.delete('/:id',(req,res)=>taskController.deleteTask(req,res));
taskRouter.patch('/:id', (req, res) =>taskController.toggleTaskCompletion(req, res));
export default taskRouter;