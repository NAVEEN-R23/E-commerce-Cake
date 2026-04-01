const express = require("express")
const { createProduct, getAlldata } = require("../controllers/productController")

const Router = express.Router()

Router.post("/createdata",createProduct)
Router.get("/getData",getAlldata)


module.exports = Router