const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Routes
router.get("/all", productController.getAllProducts);
router.post("/add", upload.array("images", 5), productController.addProduct); // Use upload.array for multiple image uploads
router.post("/create", upload.array("images", 5), productController.createProduct);
router.delete("/remove/:id", productController.removeProduct);
router.put("/toggle-favorite/:productId", productController.toggleFavorite);

module.exports = router;
