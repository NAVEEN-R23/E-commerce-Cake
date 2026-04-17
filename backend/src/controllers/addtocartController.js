const { default: mongoose } = require("mongoose");
const Cart = require("../models/addtocartSchema")

const addtocart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        console.log("BODY:", req.body)
        if (!userId || !productId) {
            return res.status(400).json({ message: "missing userId and productId" })
        }

        let cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId), })


        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({ productId, quantity: 1 })
        }
        await cart.save();
        res.json({ message: "Item added to cart", cart })

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message

        })
    }
}


const getaddtocart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId), }).populate("items.productId")
        if (!cart) return res.json({ items: [] })
        res.json({ items: cart?.items || [] })

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
const deleteaddtocart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.json({ message: "cart not found" });
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart)

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message

        })
    }
}

const decreasecart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) return res.json({ message: "Cart not found" });

        const item = cart.items.find(
            (i) => i.productId.toString() === productId
        );

        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart.items = cart.items.filter(
                    (i) => i.productId.toString() !== productId
                );
            }
        }

        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message


        });
    }
}



module.exports = { addtocart, getaddtocart, deleteaddtocart, decreasecart }
