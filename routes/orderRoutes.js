// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const ordersController = require("../controllers/orderControllers");
const { authenticate } = require("../middleware/auth");

router.get("/", authenticate, ordersController.getOrders);

router.get("/:orderId", authenticate, ordersController.getOrder);
router.post("/create", authenticate, ordersController.createOrder);
// router.patch("/update/:orderId", authenticate, ordersController.updateOrder);
router.patch("/delete/:orderId", authenticate, ordersController.deleteOrder);
router.patch("/cancel/:orderId", authenticate, ordersController.cancelOder);
router.patch("/deliver/:orderId", authenticate, ordersController.deliverOrder);

module.exports = router;
