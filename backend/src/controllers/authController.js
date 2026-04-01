const bcrypt = require("bcryptjs")
const userData = require("../models/authSchema")
const {generateToken} = require("../utils/loginToken")

const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body

        // check existing user
        const existingUser = await userData.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const postData = await userData.create({
            name, email, phone, password: hashpass, role: "user"
        })

        res.status(201).json({
            message: "User Registered Successfully",
            data: postData
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
  
      const { email, password } = req.body;
  
      // find user
      const user = await userData.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          message: "Invalid Credentials"
        });
      }
  
      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Credentials"
        });
      }
  
      // generate token
      const token = generateToken(user);
  
      // success response
      return res.status(200).json({
        message: "Login Successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token: token
      });
  
    } catch (error) {
  
      console.log("Login Error:", error);
  
      return res.status(500).json({
        message: "Server Error"
      });
  
    }
  };

module.exports = { register, login }