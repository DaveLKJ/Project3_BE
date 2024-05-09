const Product = require("../models/Product");
const User = require("../models/User");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, description, images } = req.body;
    const product = new Product({
      name,
      category,
      price,
      description,
      images,
    });
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.favorites) {
      user.favorites = [];
    }

    const isFavorite = user.favorites.includes(productId);

    if (isFavorite) {
      user.favorites = user.favorites.filter((favId) => favId !== productId);
      await user.save();
      res.json({ success: true, message: "Product removed from favorites" });
    } else {
      user.favorites.push(productId);
      await user.save();
      res.json({ success: true, message: "Product added to favorites" });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    // Extract file paths from req.files if multer processed the upload
    const images = req.files.map((file) => file.path);

    const product = new Product({
      name,
      category,
      price,
      description,
      images,
    });

    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
