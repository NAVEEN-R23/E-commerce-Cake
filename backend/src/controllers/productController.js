// const Product = require("../models/productSchema")

// // @desc   Create new product
// // @route  POST /api/products
// const createProduct = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       shortDescription,
//       price,
//       discountPrice,
//       category,
//       subCategory,
//       images,
//       thumbnail,
//       variants,
//       flavors,
//       stock,
//       isFeatured,
//       isBestSeller,
//       tags,
//     } = req.body;

//     // 🔴 Validation
//     if (!title || !price || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "Title, price and category are required",
//       });
//     }

//     // 🔴 Check if product already exists (based on title)
//     const existingProduct = await Product.findOne({ title });
//     if (existingProduct) {
//       return res.status(400).json({
//         success: false,
//         message: "Product already exists",
//       });
//     }

//     // ✅ Create Product
//     const product = await Product.create({
//       title,
//       description,
//       shortDescription,
//       price,
//       discountPrice,
//       category,
//       subCategory,
//       images: images || [],
//       thumbnail,
//       variants: variants || [],
//       flavors: flavors || [],
//       stock,
//       isFeatured,
//       isBestSeller,
//       tags,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });

//   } catch (error) {
//     console.error("Create Product Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// const getAlldata = async(req,res)=>{
//     try {
//         const data = await Product.find();
//         res.status(200).json({
//             message:"data fetched successfully",
//             data:data
//         })
//     } catch (error) {
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }

// module.exports ={
//     createProduct,
//     getAlldata
// };
const Product = require("../models/productSchema");

// ✅ Helper function moved OUTSIDE so both create and update can use it!
const safeParse = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return [];
  }
};

// ================= CREATE =================
const createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    let {
      title,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subCategory,
      weight, // ✅ ADDED weight here
      stock,
      isFeatured,
      isBestSeller,
      Eggless,
      tags,
    } = req.body;

    const variants = req.body.variants ? safeParse(req.body.variants) : [];
    const flavors = req.body.flavors ? safeParse(req.body.flavors) : [];

    const images = req.files?.images?.map((file) => file.filename) || [];
    const thumbnail = req.files?.thumbnail?.[0]?.filename || "";

    const productData = {
      title,
      description,
      shortDescription,
      price: Number(price),
      discountPrice: Number(discountPrice),
      category,
      subCategory,
      weight, // ✅ ADDED weight to the save object
      images,
      thumbnail,
      variants,
      flavors,
      stock: Number(stock),
      isFeatured: isFeatured === "true",
      isBestSeller: isBestSeller === "true",
      Eggless: Eggless === "true", // ✅ FIXED: Ensure this saves as a boolean!
      tags,
    };

    console.log("FINAL PRODUCT:", productData); // 🔥 DEBUG

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL =================
const getAlldata = async (req, res) => {
  try {
    const data = await Product.find();

    res.status(200).json({
      message: "data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE =================
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    // Parse Arrays
    if (req.body.variants) {
      updateData.variants = safeParse(req.body.variants);
    }
    if (req.body.flavors) {
      updateData.flavors = safeParse(req.body.flavors);
    }

    // ✅ FIXED: Parse Booleans properly for updates
    if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured === "true";
    if (req.body.isBestSeller !== undefined) updateData.isBestSeller = req.body.isBestSeller === "true";
    if (req.body.Eggless !== undefined) updateData.Eggless = req.body.Eggless === "true";

    // 🖼️ Handle images
    if (req.files?.images) {
      // Assuming you want the filename like in createProduct
      updateData.images = req.files.images.map((file) => file.filename); 
    }

    if (req.files?.thumbnail) {
      updateData.thumbnail = req.files.thumbnail[0].filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "Updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= DELETE =================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createProduct,
  getAlldata,
  updateProduct,
  deleteProduct,
};