const Product = require("../models/productSchema")

// @desc   Create new product
// @route  POST /api/products
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subCategory,
      images,
      thumbnail,
      variants,
      flavors,
      stock,
      isFeatured,
      isBestSeller,
      tags,
    } = req.body;

    // 🔴 Validation
    if (!title || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, price and category are required",
      });
    }

    // 🔴 Check if product already exists (based on title)
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    // ✅ Create Product
    const product = await Product.create({
      title,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subCategory,
      images: images || [],
      thumbnail,
      variants: variants || [],
      flavors: flavors || [],
      stock,
      isFeatured,
      isBestSeller,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAlldata = async(req,res)=>{
    try {
        const data = await Product.find();
        res.status(200).json({
            message:"data fetched successfully",
            data:data
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports ={
    createProduct,
    getAlldata
};