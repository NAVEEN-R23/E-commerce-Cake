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
const cartRouter = require("./routes/addtoCartRoutes");
const wishlistRouter = require("./routes/wishlistRoutes");
const { chatHandler } = require("./controllers/claudeController");

const app = express()

// app.use(cors())
// app.use(cors({
//     origin:"http://localhost:5173 "
// }))

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()

app.use("/products", Router)
app.use("/api/auth", authRouter)
app.use("/uploads", express.static("uploads"));
app.use("/cart", cartRouter)
app.use("/wishlist", wishlistRouter)
// for ai bot
app.use("/api", chatHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`the express is running on this ${PORT}`);
})