const Product = require("../models/productSchema");

exports.chatHandler = async (req, res) => {
  try {
    const { messages } = req.body;
    const userText = messages[messages.length - 1].content.toLowerCase();

    let products = [];
    let reply = "";

    // ✅ FIX 1: Smarter price extraction — get the number AFTER the keyword
    const priceMatch = userText.match(
      /(?:below|under|above|less than|more than|upto)\s*[₹rs.]?\s*(\d+)/i
    );
    const price = priceMatch ? parseInt(priceMatch[1]) : null; // ✅ group 1, not group 0

    // BELOW / UNDER
    if (userText.includes("below") || userText.includes("under")) {
      if (!price) {
        return res.json({ reply: "Please mention a price, e.g. 'show products under 500'", products: [] });
      }
      products = await Product.find({ price: { $lte: price } });
      reply = products.length
        ? `Here are products below ₹${price}`
        : `No products found below ₹${price}`;
    }

    // ✅ FIX 2: ABOVE was using $lte instead of $gte
    else if (userText.includes("above")) {
      if (!price) {
        return res.json({ reply: "Please mention a price, e.g. 'show products above 500'", products: [] });
      }
      products = await Product.find({ price: { $gte: price } }); // ✅ was $lte — WRONG
      reply = products.length
        ? `Here are products above ₹${price}`
        : `No products found above ₹${price}`;
    }

    // NORMAL SEARCH
    else {
      const cleanText = userText
        .replace(/show me|find|give|get|i want|please|buy/gi, "")
        .trim();

      if (!cleanText) {
        return res.json({ reply: "What are you looking for?", products: [] });
      }

      products = await Product.find({
        $or: [
          { name: { $regex: cleanText, $options: "i" } },
          { category: { $regex: cleanText, $options: "i" } },
          { description: { $regex: cleanText, $options: "i" } },
        ],
      });

      reply = products.length
        ? `I found ${products.length} products for "${cleanText}"`
        : `No products found for "${cleanText}"`;
    }

    return res.json({ reply, products });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: "Server error", products: [] });
  }
};