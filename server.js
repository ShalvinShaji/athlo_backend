const app = require("./app");
const mongoose = require("mongoose");
const seedAdmin = require("./utils/seedAdmin");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Athlo admin DB");
    seedAdmin();
    app.listen(process.env.PORT, () => {
      console.log(`Athlo admin API is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Athlo admin DB connection error - ${error}`);
  });
