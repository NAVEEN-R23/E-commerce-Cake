const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("MONGO DB connected successfully");
        
    } catch (error) {
        console.log("Connect error",error);
        
    }
}

module.exports = connectDB