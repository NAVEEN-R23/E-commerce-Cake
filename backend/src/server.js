// // console.log("nodemon is running");
// const dns = require("dns");

// /* Fix MongoDB SRV DNS issue */
// dns.setDefaultResultOrder("ipv4first");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require("express")
// const dotenv = require("dotenv");
// dotenv.config()
// const cors = require("cors")

// const connectDB = require("./config/db");
// const Router = require("./routes/productRoutes");
// const loginRouter = require("./routes/authRoutes");
// const authRouter = require("./routes/authRoutes");
// const cartRouter = require("./routes/addtoCartRoutes");
// const wishlistRouter = require("./routes/wishlistRoutes");
// const { chatHandler } = require("./controllers/claudeController");
// const addressRouter = require("./routes/addressRoutes");
// const customOrderRouter = require("./routes/customOrderRoutes");
// const router = require("./routes/orderRoutes");
// const app = express()

// // app.use(cors())
// // app.use(cors({
// //     origin:"http://localhost:5173 "
// // }))



// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cors())
// connectDB()

// app.use("/products", Router)
// app.use("/api/auth", authRouter)
// app.use("/uploads", express.static("uploads"));
// app.use("/cart", cartRouter)
// app.use("/wishlist", wishlistRouter)
// app.use("/address", addressRouter);
// app.use("/customize",customOrderRouter)
// app.use("/order",router)   
// // for ai bot
// app.use("/api", chatHandler)


// const PORT = process.env.PORT
// app.listen(PORT, () => {
//     console.log(`the express is running on this ${PORT}`);
// })
















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
const authRouter = require("./routes/authRoutes"); // Only once
const cartRouter = require("./routes/addtoCartRoutes");
const wishlistRouter = require("./routes/wishlistRoutes");
const { chatHandler } = require("./controllers/claudeController");
const addressRouter = require("./routes/addressRoutes");
const customOrderRouter = require("./routes/customOrderRoutes");
const router = require("./routes/orderRoutes");
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()) // Consider restricting in production

// Connect to database
connectDB()

// Routes
app.use("/products", Router)
app.use("/api/auth", authRouter)
app.use("/uploads", express.static("uploads"));
app.use("/cart", cartRouter)
app.use("/wishlist", wishlistRouter)
app.use("/address", addressRouter);
app.use("/customize", customOrderRouter)
app.use("/order", router)   
app.use("/api", chatHandler)

// Health check for Render
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// FIX 1: Add fallback PORT
// FIX 2: Bind to 0.0.0.0
const PORT = process.env.PORT || 10000
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
})