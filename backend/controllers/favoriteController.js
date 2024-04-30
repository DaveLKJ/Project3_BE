const Favorite = require("../models/Favorite");

exports.addToFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the user's favorites
    let favorites = await Favorite.findOne({ user: userId });

    // If the favorites don't exist, create a new one
    if (!favorites) {
      favorites = new Favorite({ user: userId, products: [] });
    }

    // Add the product to favorites
    favorites.products.push(productId);
    await favorites.save();

    res.json({ message: "Product added to favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the user's favorites
    const favorites = await Favorite.findOne({ user: userId });

    // Remove the product from favorites
    favorites.products = favorites.products.filter(
      (p) => p.toString() !== productId
    );
    await favorites.save();

    res.json({ message: "Product removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
