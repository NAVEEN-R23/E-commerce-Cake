const Order = require("../models/orderSchema");
const Cart = require("../models/addtocartSchema");

const placeOrder = async (req, res) => {
  try {
    const { userId, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    const order = await Order.create({
      userId,
      items: cart.items,
      totalAmount,
      paymentMethod,
    });

    // 🧹 Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};  

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports={
    placeOrder,
    getAllOrders,
    updateOrderStatus
}