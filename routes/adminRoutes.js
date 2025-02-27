const express = require("express");
const adminController = require("../controllers/adminController");
const  {authenticate}  = require("../middleware/auth");
const router = express.Router();

// Admin login
router.post("/login", adminController.login);
// Protected routes (Admin-only)
router.get("/profile", authenticate, adminController.profile);


module.exports = router;
