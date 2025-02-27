const express = require("express");
const productController = require("../controllers/productController");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.get("/", productController.getProducts);
router.post("/product/create", authenticate, productController.createProduct);
router.patch(
  "/product/update/:id",
  authenticate,
  productController.updateProduct
);
router.delete(
  "/product/delete/:id",
  authenticate,
  productController.deleteProduct
);

module.exports = router;
