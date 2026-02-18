import mongoose from "mongoose";



const patientSchema = new mongoose.Schema({
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
    category:{
        type:String,
        required:true
    },
    datetime:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
},{timestamps:true})



const Patient = mongoose.model("Patient",patientSchema)

export default Patient