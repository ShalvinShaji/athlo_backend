const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.status(200).json({ status: "success", token });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.profile = (req, res) => {
  res.json({ status: "success", message: "In profile page" });
};
