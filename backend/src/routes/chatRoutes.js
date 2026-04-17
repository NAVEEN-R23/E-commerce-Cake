const express = require("express");
const router = express.Router();

const { chatHandler } = require("../controllers/chatController");

// ✅ THIS is your missing link
router.post("/chat", chatHandler);

module.exports = router;