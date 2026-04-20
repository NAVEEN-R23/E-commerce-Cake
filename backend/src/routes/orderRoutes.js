const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders, updateOrderStatus } = require("../controllers/orderController");

router.post("/place-order", placeOrder);
router.get("/orders", getAllOrders);

// 🔥 NEW
router.post("/update-order", updateOrderStatus);

module.exports = router;