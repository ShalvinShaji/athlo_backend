const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const seedAdmin = async () => {
  const admin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!admin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });
    console.log("Admin user seeded successfully.");
  }
};

module.exports = seedAdmin;

