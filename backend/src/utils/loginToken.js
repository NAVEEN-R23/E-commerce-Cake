const jwt = require("jsonwebtoken")

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}


// Verify JWT Middleware
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        })
    }

    const token = authHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or Expired Token"
        })

    }
}

module.exports = { generateToken, verifyToken }