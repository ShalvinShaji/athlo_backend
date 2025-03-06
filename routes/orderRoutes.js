// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const ordersController = require("../controllers/orderControllers");
const { authenticate } = require("../middleware/auth");

router.get("/", authenticate, ordersController.getOrders);

// GET /orders/:orderId - Fetch detailed order by ID
router.get("/:orderId", authenticate, ordersController.getOrder);
router.post("/create", authenticate, ordersController.createOrder);

module.exports = router;
