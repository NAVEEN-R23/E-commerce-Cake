const mongoose = require("mongoose");

// ✅ Address Schema
const addressSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    landmark: String,
    type: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },
  },
  { timestamps: true }
);

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // ✅ ADD THIS
  addresses: [addressSchema],
});

const userData = mongoose.model("Userdata", userSchema);

module.exports = userData;