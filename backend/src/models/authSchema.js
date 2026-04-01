const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        match:/^[0-9]{10}$/
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})

const userData = mongoose.model("Userdata", userSchema)

module.exports = userData