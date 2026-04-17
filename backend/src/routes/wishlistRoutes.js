const express = require("express");
const { togglewishlist, getwishlist } = require("../controllers/wishlistController");
const wishlsitRouter = express.Router();


wishlsitRouter.post("/toggle", togglewishlist);
wishlsitRouter.get("/:userid", getwishlist);

module.exports = wishlsitRouter