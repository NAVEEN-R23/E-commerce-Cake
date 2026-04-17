const express = require("express")
const { addtocart, getaddtocart, deleteaddtocart,decreasecart } = require("../controllers/addtocartController")
const cartRouter = express.Router()

cartRouter.post("/add", addtocart)
cartRouter.get("/:userId", getaddtocart)
cartRouter.delete("/remove/:userId/:productId", deleteaddtocart)
cartRouter.post("/decrease", decreasecart)

module.exports = cartRouter;
