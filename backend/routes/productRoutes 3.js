const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});


const upload = multer({ storage: storage });

// Routes
router.get("/all", productController.getAllProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.post("/add", upload.array("images", 5), productController.addProduct);
router.post("/create", upload.array("images", 5), productController.createProduct);
router.delete("/remove/:id", productController.removeProduct);
router.put("/toggle-favorite/:productId", productController.toggleFavorite);
router.get("/favorites", productController.getFavoriteProducts);
router.get("/:productId", productController.getProductById); // Moved above the /favorites route



module.exports = router;
