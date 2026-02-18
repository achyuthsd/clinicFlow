import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
     name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phno:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
},{timestamps:true})

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; 
  this.password = await bcrypt.hash(this.password, 10);
});



userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User",userSchema)

export default User