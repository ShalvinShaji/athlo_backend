const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Athlo admin API is running at port ${process.env.PORT}`);
});
