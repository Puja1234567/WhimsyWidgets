import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true});
            console.log('Mongoose Connected');
    }
    catch(error){
        console.log('Error connecting to MongoDb',error);
        process.exit(1);
    }
};

export default connectDB;