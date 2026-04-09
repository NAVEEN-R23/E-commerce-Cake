const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  weight: {
    type: String, // 500g, 1kg
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    // Basic Info
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: String,

    // Pricing
    price: {
      type: Number,
      required: true,
    },
    discountPrice: Number,

    // Category
    category: {
      type: String,
      required: true, // Cakes, Desserts
    },
    subCategory: String,

    // ✅ NEW: Added top-level weight to match your new Admin Form dropdown
    weight: {
      type: String, 
    },

    // Media
    images: [
      {
        type: String, // image URLs
      },
    ],
    thumbnail: String,

    // Cake-specific 🎂
    variants: [variantSchema], // Keep this if you still want to offer multiple weights for a single cake later!
    flavors: [String], // chocolate, vanilla

    // Stock & Availability
    stock: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Ratings
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },

    // Flags
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    Eggless: {
      type: Boolean,
      default: false,
    },

    // SEO / Tags
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);