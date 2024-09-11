import "./env.js";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url'; //converts a URL into a file path.
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";
import giftRouter from "./routes/giftRoutes.js";

const server =express();

server.use(cors());
server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded for images/files
// Serve static files from the "uploads" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

server.use("/api/tasks",taskRouter);
server.use("/api/users",userRouter);
server.use("/api/gift",giftRouter);


server.get("/",(req,res)=>{
    res.send("Sai Priya Application")

})

const PORT =process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
    connectDB();
})
