const User = require("../models/authSchema");

// 📥 Get Addresses
exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Add Address
exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.addresses.length >= 5) {
      return res.status(400).json({ message: "Max 5 addresses allowed" });
    }

    user.addresses.push(req.body);
    await user.save();

    res.json(user.addresses);
  } catch (err) {
    console.log("ADD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update Address
exports.updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, req.body);
    await user.save();

    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete Address
exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId
    );

    await user.save();

    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};