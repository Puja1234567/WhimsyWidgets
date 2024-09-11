import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    gender:{type:String,required:true, enum: ['male', 'female'] }
    // profilePic:{type:String, default:'https://cdn-icons-png.flaticon.com/128/6997/6997674.png'}, 
})

userSchema.pre('save', function(next) {
  if (this.gender === 'male') {
    this.profilePic = 'https://cdn-icons-png.flaticon.com/128/6997/6997674.png';
  } else {
    this.profilePic ='https://cdn-icons-png.flaticon.com/128/6997/6997668.png';
  }

  next();
})
var UserModel = mongoose.model('User',userSchema);
export default UserModel;

//document middleware


