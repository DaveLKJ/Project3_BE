const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

// Routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", authenticateToken, userController.logout);

// Protected route example
router.get("/profile", authenticateToken, (req, res) => {
  // Access the authenticated user's profile
  res.send("Authenticated user profile");
});

module.exports = router;
