const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // Add the product to the cart
    cart.products.push(productId);
    await cart.save();

    res.json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    // Check if the cart exists
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    console.log("Cart before removal:", cart); // Log cart before removal

    // Remove the product from the cart
    cart.products = cart.products.filter((p) => p.toString() !== productId);
    await cart.save();

    console.log("Cart after removal:", cart); // Log cart after removal

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate("products");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
