const Order = require("../models/Order");

exports.checkout = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Create a new order
    const newOrder = new Order({ user: userId, products });
    await newOrder.save();

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
