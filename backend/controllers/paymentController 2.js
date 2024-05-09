const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");

exports.makePayment = async (req, res) => {
  try {
    // Retrieve necessary information from the request
    const { amount, currency, description, source, orderId } = req.body;

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      source, // Stripe token or source ID
    });

    // Payment successful, update order status in the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "paid";
    await order.save();

    // Send response to client
    res.json({ message: "Payment successful", charge, order });
  } catch (error) {
    // Payment failed, send error message to client
    res.status(500).json({ message: error.message });
  }
};
