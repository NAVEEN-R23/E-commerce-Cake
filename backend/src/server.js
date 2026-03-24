// console.log("nodemon is running");

const express = require("express")
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDB()

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`the express is running on this ${PORT}`);
})