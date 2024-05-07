const mongoose = require("mongoose");
const itemSchema = require("./itemSchema");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  shipped: { type: Boolean, default: false },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  paymentMethod: { type: String },
  // other order details
  timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);
