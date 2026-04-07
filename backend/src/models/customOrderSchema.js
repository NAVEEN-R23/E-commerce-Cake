const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    eventType: {
      type: String
    },

    cakeType: {
      type: String,
      required: true
    },

    cakeSize: {
      type: String,
      required: true
    },

    eggType: {
      type: String,
      required: true
    },

    customSize: {
      type: String
    },

    tierCount: {
      type: String
    },

    flavor: {
      type: String,
      required: true
    },

    customFlavor: {
      type: String
    },

    shape: {
      type: String,
      required: true
    },

    customShape: {
      type: String
    },

    message: {
      type: String
    },

    deliveryDate: {
      type: Date,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    instructions: {
      type: String
    },

    image: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomOrder", customOrderSchema);