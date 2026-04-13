const express = require("express")
const { addWishlist, getWishlist, removeWishlist } = require("../controllers/wishlistController")

const wishlistRoute = express.Router()

wishlistRoute.post("/add", addWishlist)

wishlistRoute.get("/get/:userId", getWishlist)

wishlistRoute.delete("/remove", removeWishlist)

module.exports = wishlistRoute