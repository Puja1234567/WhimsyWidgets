import UserModel from "../../models/User/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 

export default class UserController{
    register=async(req,res)=>{
    const {name,email,password}=req.body;
    const profilePic=req.file.filename;
    try{
        const existingUser =await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({error:"User already exists"});
        }
        const hashedPassword =await bcrypt.hash(password,10);
        const newUser = new UserModel({name,email,password:hashedPassword});
        await newUser.save();
        res.status(200).json(newUser);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"error registering user"});
    }
}
login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid email "})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid password"})
        }
        const token =jwt.sign({id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.status(200).send(token);
    }catch(error){
        res.status(500).json({error:"Error logging in"})
    }
}

}
