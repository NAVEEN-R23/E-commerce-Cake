const Wishlist = require("../models/wishlistSchema")


const togglewishlist = async (req, res) => {
    try {
        const { userid, product } = req.body;
        let wishlist = await Wishlist.findOne({ userid })
        if (!wishlist) { wishlist = new wishlist({ userid, products: [] }) }
        const exists = wishlist.items.find((item) => item.productId.toString() === productId);
        if (!exists) {
            wishlist.items.push({ productId })
        }
        await wishlist.save();
        res.json(wishlist)

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

const getwishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userid: req.params.userid }).populate("items.productId")
        if (!wishlist) { return res.status(400).json({ message: "client side error" }) }
        res.json(wishlist)

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })

    }
}

module.exports = { togglewishlist, getwishlist }