import mongoose from "mongoose";



const detailSchema = new mongoose.Schema({
    username: {
    type:String,
    required: true,
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



const Detail = mongoose.model("Detail",detailSchema)

export default Detail