const customOrderSchema = require("../models/customOrderSchema")

const createCustomOrder = async (req, res) => {
  try {
    const {
      name,
      phone,
      eventType,
      cakeType,
      cakeSize,
      eggType,
      customSize,
      tierCount,
      flavor,
      customFlavor,
      shape,
      customShape,
      message,
      deliveryDate,
      address,
      instructions
    } = req.body

    let imagePath = ""

    if (req.file) {
      imagePath = req.file.path
    }

    const orderData = await customOrderSchema.create({
      name,
      phone,
      eventType,
      cakeType,
      cakeSize,
      eggType,
      customSize,
      tierCount,
      flavor,
      customFlavor,
      shape,
      customShape,
      message,
      deliveryDate,
      address,
      instructions,
      image: imagePath
    })

    res.status(201).json({
      message: "Custom Order Created Successfully",
      data: orderData
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

module.exports = { createCustomOrder }