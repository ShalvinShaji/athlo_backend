exports.createProduct = (req, res) => {
  try {
    res.status(200).json({ status: "sucess", message: "product created" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.getProducts = (req, res) => {
  try {
    res.status(200).json({ status: "sucess", message: "product retrieved" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
