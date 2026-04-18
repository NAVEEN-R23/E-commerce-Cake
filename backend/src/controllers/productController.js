// const Product = require("../models/productSchema");
// const cloudinary = require("../config/cloudinary");

// // ✅ Helper function moved OUTSIDE so both create and update can use it!
// const safeParse = (data) => {
//   try {
//     return typeof data === "string" ? JSON.parse(data) : data;
//   } catch {
//     return [];
//   }
// };

// // ================= CREATE =================
// const createProduct = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILES:", req.files);

//     let {
//       title,
//       description,
//       shortDescription,
//       price,
//       discountPrice,
//       category,
//       subCategory,
//       weight, // ✅ ADDED weight here
//       stock,
//       isFeatured,
//       isBestSeller,
//       Eggless,
//       tags,
//     } = req.body;

//     const variants = req.body.variants ? safeParse(req.body.variants) : [];
//     const flavors = req.body.flavors ? safeParse(req.body.flavors) : [];

//    const images =
//   req.files?.images?.map((file) => ({
//     url: file.path,
//     public_id: file.filename,
//   })) || [];
//    const thumbnail = req.files?.thumbnail?.[0]
//   ? {
//       url: req.files.thumbnail[0].path,
//       public_id: req.files.thumbnail[0].filename,
//     }
//   : null;

//     const productData = {
//       title,
//       description,
//       shortDescription,
//       price: Number(price),
//       discountPrice: Number(discountPrice),
//       category,
//       subCategory,
//       weight, // ✅ ADDED weight to the save object
//       images,
//       thumbnail,
//       variants,
//       flavors,
//       stock: Number(stock),
//       isFeatured: isFeatured === "true",
//       isBestSeller: isBestSeller === "true",
//       Eggless: Eggless === "true", // ✅ FIXED: Ensure this saves as a boolean!
//       tags,
//     };

//     console.log("FINAL PRODUCT:", productData); // 🔥 DEBUG

//     const product = await Product.create(productData);

//     res.status(201).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     console.error("CREATE ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET ALL =================
// const getAlldata = async (req, res) => {
//   try {
//     const data = await Product.find();

//     res.status(200).json({
//       message: "data fetched successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // ================= UPDATE =================
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     let updateData = { ...req.body };

//     // Parse Arrays
//     if (req.body.variants) {
//       updateData.variants = safeParse(req.body.variants);
//     }
//     if (req.body.flavors) {
//       updateData.flavors = safeParse(req.body.flavors);
//     }

//     // ✅ FIXED: Parse Booleans properly for updates
//     if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured === "true";
//     if (req.body.isBestSeller !== undefined) updateData.isBestSeller = req.body.isBestSeller === "true";
//     if (req.body.Eggless !== undefined) updateData.Eggless = req.body.Eggless === "true";

//     // 🖼️ Handle images
//     if (req.files?.images) {
//       // Assuming you want the filename like in createProduct
//       updateData.images = req.files.images.map((file) => file.path);
//     }

//     if (req.files?.thumbnail) {
//       updateData.thumbnail = req.files.thumbnail[0].path;
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     res.status(200).json({
//       message: "Updated successfully",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     console.error("UPDATE ERROR:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ================= DELETE =================


// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     // 🔥 Delete images from Cloudinary
//     for (let img of product.images) {
//       await cloudinary.uploader.destroy(img.public_id);
//     }

//     // 🔥 Delete thumbnail
//     if (product.thumbnail?.public_id) {
//       await cloudinary.uploader.destroy(product.thumbnail.public_id);
//     }

//     // Delete from DB
//     await Product.findByIdAndDelete(id);

//     res.status(200).json({
//       message: "Product & images deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

// module.exports = {
//   createProduct,
//   getAlldata,
//   updateProduct,
//   deleteProduct,
// };


const Product = require("../models/productSchema");
const cloudinary = require("../config/cloudinary");

// ✅ Safe JSON parser
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
    let {
      title,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subCategory,
      weight,
      stock,
      isFeatured,
      isBestSeller,
      Eggless,
      tags,
    } = req.body;

    const variants = req.body.variants ? safeParse(req.body.variants) : [];
    const flavors = req.body.flavors ? safeParse(req.body.flavors) : [];

    // ✅ FIX: Convert tags to array
    const parsedTags = tags
      ? tags.split(",").map((tag) => tag.trim())
      : [];

    // 🖼️ Images
    const images =
      req.files?.images?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

    const thumbnail = req.files?.thumbnail?.[0]
      ? {
          url: req.files.thumbnail[0].path,
          public_id: req.files.thumbnail[0].filename,
        }
      : null;

    const productData = {
      title,
      description,
      shortDescription,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      category,
      subCategory,
      weight,
      images,
      thumbnail,
      variants,
      flavors,
      stock: Number(stock),
      isFeatured: isFeatured === "true",
      isBestSeller: isBestSeller === "true",
      Eggless: Eggless === "true",
      tags: parsedTags,
    };

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
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= SEARCH =================
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { subCategory: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("SEARCH ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= UPDATE =================
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    // Parse arrays
    if (req.body.variants) {
      updateData.variants = safeParse(req.body.variants);
    }
    if (req.body.flavors) {
      updateData.flavors = safeParse(req.body.flavors);
    }

    // Parse tags
    if (req.body.tags) {
      updateData.tags = req.body.tags
        .split(",")
        .map((tag) => tag.trim());
    }

    // Parse booleans
    if (req.body.isFeatured !== undefined)
      updateData.isFeatured = req.body.isFeatured === "true";

    if (req.body.isBestSeller !== undefined)
      updateData.isBestSeller = req.body.isBestSeller === "true";

    if (req.body.Eggless !== undefined)
      updateData.Eggless = req.body.Eggless === "true";

    // 🖼️ FIXED image structure
    if (req.files?.images) {
      updateData.images = req.files.images.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    if (req.files?.thumbnail) {
      updateData.thumbnail = {
        url: req.files.thumbnail[0].path,
        public_id: req.files.thumbnail[0].filename,
      };
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

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Delete images from Cloudinary
    for (let img of product.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // Delete thumbnail
    if (product.thumbnail?.public_id) {
      await cloudinary.uploader.destroy(product.thumbnail.public_id);
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product & images deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
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
  searchProducts, // 🔥 IMPORTANT
};