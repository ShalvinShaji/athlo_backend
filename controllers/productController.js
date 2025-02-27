const Product = require("../models/Product");

// Create new product
exports.createProduct = async (req, res) => {
  try {
    let { name, price, description, category, stock } = req.body;
    let isProductExist = await Product.findOne({ name });
    if (isProductExist) {
      let newStock = Number(isProductExist.stock) + Number(stock);
      await Product.findOneAndUpdate(
        { _id: isProductExist._id },
        { $set: { stock: newStock } },
        { new: true }
      );

      return res.json({
        status: "success",
        message: "Product stock updated successfully",
      });
    } else {
      let createdProduct = await Product.create({
        name,
        price,
        description,
        category,
        stock,
      });
      res
        .status(200)
        .json({ status: "success", message: "Product created successfully" });
    }
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// Get all products

exports.getProducts = async (req, res) => {
  try {
    let allProducts = await Product.find();
    res.status(200).json({ status: "sucess", message: allProducts });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// Delete product

exports.deleteProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    let deletedProduct = await Product.findOneAndDelete({ _id: productId });
    res
      .status(200)
      .json({ status: "sucess", message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// Update the product

exports.updateProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    let { name, price, description, category, stock } = req.body;
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    let updateFields = {};
    if (name) updateFields.name = name;
    if (price) updateFields.price = price;
    if (description) updateFields.description = description;
    if (category) updateFields.category = category;
    if (stock) updateFields.stock = stock;

    // Check if there is anything to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No valid fields provided for update",
      });
    }
    let updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true }
    );

    res
      .status(200)
      .json({ status: "sucess", message: "Product updated successfully" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
