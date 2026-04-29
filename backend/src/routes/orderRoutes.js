const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders, updateOrderStatus, getUserOrders } = require("../controllers/orderController");

router.post("/place-order", placeOrder);
router.get("/orders", getAllOrders);

// 🔥 NEW
router.post("/update-order", updateOrderStatus);
router.get("/user-orders/:userId", getUserOrders);

module.exports = router;