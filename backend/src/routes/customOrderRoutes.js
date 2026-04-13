const express = require("express")
const customOrderRouter = express.Router()

const upload = require("../middleware/multer")
const { createCustomOrder } = require("../controllers/customOderController")

customOrderRouter.post("/custom-order", upload.single("image"), createCustomOrder)

module.exports = customOrderRouter

