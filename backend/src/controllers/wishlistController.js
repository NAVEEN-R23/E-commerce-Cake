const wishlistData = require("../models/wishlistSchema")

// Add to wishlist
const addWishlist = async (req, res) => {
    try {

        const { userId, productId } = req.body

        // check already exists
        const existing = await wishlistData.findOne({ userId, productId })

        if (existing) {
            return res.status(400).json({
                message: "Product already in wishlist"
            })
        }

        const data = await wishlistData.create({
            userId,
            productId
        })

        res.status(201).json({
            message: "Added to wishlist",
            data
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}


// Get wishlist of user
const getWishlist = async (req, res) => {

    try {

        const { userId } = req.params

        const data = await wishlistData
            .find({ userId })
            .populate("productId")

        res.status(200).json({
            message: "Wishlist fetched",
            data
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}


// Remove from wishlist
const removeWishlist = async (req, res) => {

    try {

        const { userId, productId } = req.body

        await wishlistData.findOneAndDelete({ userId, productId })

        res.status(200).json({
            message: "Removed from wishlist"
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist
}