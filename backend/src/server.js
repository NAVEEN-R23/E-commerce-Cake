// console.log("nodemon is running");
const dns = require("dns");

/* Fix MongoDB SRV DNS issue */
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express")
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors")

const connectDB = require("./config/db");
const Router = require("./routes/productRoutes");
const loginRouter = require("./routes/authRoutes");
const authRouter = require("./routes/authRoutes");
const customOrderRoutes = require("./routes/customOrderRoutes");


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
app.use("/api",customOrderRouter)   
app.use("/uploads", express.static("uploads"));
app.use("/api", customOrderRoutes);
app.use("/wishlist", wishlistRoute)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`the express is running on this ${PORT}`);
})