const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .select("_id user totalAmount delivered cancelled deleted createdAt");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "items.product",
      "name price image"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
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
  const { orderId } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { deleted: true },
      { new: true }
    );
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
exports.cancelOder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { cancelled: true },
      { new: true }
    );

    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling order", error });
  }
};
exports.deliverOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { delivered: true },
      { new: true }
    );
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Error delivering order", error });
  }
};
