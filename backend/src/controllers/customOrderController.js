const CustomOrder = require("../models/customOrderSchema");
const cloudinary = require("../config/cloudinary");

// CREATE ORDER
const createCustomOrder = async (req, res) => {
  try {
    console.log(req.file); // debug once

    let imagePath = "";
    let publicId = "";

    if (req.file) {
      imagePath = req.file.path;        // Cloudinary URL
      publicId = req.file.filename;     // Cloudinary public_id
    }

    const orderData = await CustomOrder.create({
      ...req.body,
      image: imagePath,
      public_id: publicId
    });

    res.status(201).json({
      message: "Custom Order Created Successfully",
      data: orderData
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL ORDERS
const getCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched",
      data: orders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ORDER + IMAGE FROM CLOUDINARY
const deleteCustomOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await CustomOrder.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔥 delete image from cloudinary
    if (order.public_id) {
      await cloudinary.uploader.destroy(order.public_id);
    }

    await CustomOrder.findByIdAndDelete(id);

    res.json({ message: "Order deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCustomOrder,
  getCustomOrders,
  deleteCustomOrder,
};