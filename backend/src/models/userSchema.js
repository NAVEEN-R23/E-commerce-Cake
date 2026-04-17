// models/User.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    house: { type: String, required: true },
    area: { type: String, required: true },
    landmark: String,
    type: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  addresses: [addressSchema], // ✅ embedded
});

module.exports = mongoose.model("User", userSchema);