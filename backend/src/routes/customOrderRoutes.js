const express = require("express");
const customOrderRouter = express.Router();

const {
  createCustomOrder,
  getCustomOrders,
  deleteCustomOrder,
} = require("../controllers/customOrderController"); // ✅ fixed spelling

const upload = require("../middleware/uploadMiddleware");

// ✅ Routes
customOrderRouter.post("/custom-order", upload.single("image"), createCustomOrder);
customOrderRouter.get("/getdata", getCustomOrders);
customOrderRouter.delete("/deletedata/:id", deleteCustomOrder);

module.exports = customOrderRouter;
