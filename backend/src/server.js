// console.log("nodemon is running");

const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors")

const connectDB = require("./config/db");
const Router = require("./routes/productRoutes");
const loginRouter = require("./routes/authRoutes");
const authRouter = require("./routes/authRoutes");

dotenv.config()
const app = express()

// app.use(cors())
app.use(cors({
    origin:"http://localhost:5173 "
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDB()

app.use("/products",Router)
app.use("/api/auth",authRouter)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`the express is running on this ${PORT}`);
})