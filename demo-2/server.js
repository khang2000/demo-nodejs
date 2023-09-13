const express = require("express");
const app = express();
const PORT = 8000;

const products = [
  {
    id: "111",
    name: "quan",
    price: 100,
  },
  {
    id: "112",
    name: "ao",
    price: 200,
  },
  {
    id: "113",
    name: "tat",
    price: 300,
  },
];
app.get("/", (req, res) => {
  res.send(products);
});
app.get("/:id", (req, res) => {
  const product = products.find((product) => (product.id = req.params.id));
  res.send(product);
});
app.post("/create", (req, res) => {
  res.send("tao list san pham");
});
app.put("/update", (req, res) => {
  res.send("cap nhat san pham thanh cong");
});
app.delete("/remove", (req, res) => {
  res.send("xoa san pham thanh cong");
});

app.listen(PORT, () => {
  console.log(`app is running ${PORT}`);
});
