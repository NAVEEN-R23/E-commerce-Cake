const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO DB connected successfully");
        
    } catch (error) {
        console.log("Connect error",error);
        
    }
}

module.exports = connectDB