const Product = require("../models/productSchema");

exports.chatHandler = async (req, res) => {
  try {
    const { messages } = req.body;

    const userText =
      messages[messages.length - 1].content.toLowerCase();

    let products = [];
    let reply = "";

    // 🔍 PRICE FILTERS
    const priceMatch = userText.match(/\d+/);
    const price = priceMatch ? parseInt(priceMatch[0]) : null;

    // BELOW / UNDER
    if (userText.includes("below") || userText.includes("under")) {
      products = await Product.find({ price: { $lte: price } });
      reply = `Here are products below ₹${price}`;
    }

    // ABOVE
    else if (userText.includes("above")) {
      products = await Product.find({ price: { $gte: price } });
      reply = `Here are products above ₹${price}`;
    }

    // 🔍 NORMAL SEARCH
    else {
      const cleanText = userText
        .replace(/show me|find|give|get|i want|please|buy/gi, "")
        .trim();

      products = await Product.find({
        $or: [
          { name: { $regex: cleanText, $options: "i" } },
          { category: { $regex: cleanText, $options: "i" } },
          { description: { $regex: cleanText, $options: "i" } }
        ]
      });

      reply = products.length
        ? `I found ${products.length} products`
        : "No products found";
    }

    // ✅ ALWAYS RETURN RESPONSE HERE
    return res.json({
      reply,
      products
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      reply: "Server error",
      products: []
    });
  }
};