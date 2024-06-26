const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");


router.get("/user/:userId", ordersController.getOrdersByUserId);

module.exports = router;
