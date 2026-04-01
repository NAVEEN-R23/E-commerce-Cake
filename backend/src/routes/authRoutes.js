const express = require("express")
const { register, login } = require("../controllers/authController")
const checkRole = require("../utils/roleMiddleware")
const { verifyToken } = require("../utils/loginToken")


const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)

// 🔹 Admin protected route
authRouter.get(
    "/admin",
    verifyToken,
    checkRole("admin"),
    (req, res) => {
      res.json({
        message: "Welcome Admin",
        user: req.user
      })
    }
  )

module.exports = authRouter