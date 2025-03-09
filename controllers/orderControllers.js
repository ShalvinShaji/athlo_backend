const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .select("_id user totalAmount status createdAt");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user", "name email address") // Populate user details
      .populate("items.product", "name price"); // Populate product details in items
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order details", error });
  }
};

exports.createOrder = async (req, res) => {
  const { user, items, totalAmount } = req.body;
  try {
    const order = await Order.create({ user, items, totalAmount });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};
exports.deleteOrder = async (req, res) => {
  console.log(req.body);
  const { orderId } = req.body;
  try {
    res.status(201).json(orderId);
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
exports.cancelOder = async (req, res) => {
  console.log(req.body);
  const { orderId } = req.body;
  try {
    res.status(201).json(orderId);
  } catch (error) {
    res.status(500).json({ message: "Error cancelling order", error });
  }
};
exports.deliverOrder = async (req, res) => {
  console.log(req.body);
  const { orderId } = req.body;
  try {
    res.status(201).json(orderId);
  } catch (error) {
    res.status(500).json({ message: "Error delivering order", error });
  }
};
