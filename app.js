const express = require("express");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use("/admin", adminRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", mesaage: "Athlo admin API is running" });
});

module.exports = app;
