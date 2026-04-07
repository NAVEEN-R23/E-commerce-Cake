const express = required("express")
const customOrderRouter = express.router()

const upload = require("../middleware/multer")

router.post("/custom-order", upload.single("image"), createCustomOrder)

module.exports = customOrderRouter