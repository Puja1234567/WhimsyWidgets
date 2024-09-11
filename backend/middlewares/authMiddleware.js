import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
    //   1.  Read the token
    const token= req.headers['authorization'];

    //  2. if no token , return error
    if(!token){
        return res.status(401).send("Unauthorized");
    }

    //  3. check if token is valid
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.userID=payload.userID;
    }catch(err){
        //  4. return error
        console.log(err);
        return res.status(401).send("Unauthorized");

    }
    //  5. call the next middleware
    next();
}

export default authMiddleware;

    