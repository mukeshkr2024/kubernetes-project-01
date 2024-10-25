// productService.js
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const app = express();
const PORT = 3003;

app.use(bodyParser.json());

// In-memory store for products
const products = {};

// Add a new product
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const productId = uuidv4();
  products[productId] = { productId, name, price };
  res.status(201).json({ message: "Product added", productId });
});

// Get all products
app.get("/products", (req, res) => {
  res.json(Object.values(products));
});

// Register this service with the Service Registry
axios
  .post("http://localhost:8761/register", {
    name: "ProductService",
    host: "localhost",
    port: PORT,
  })
  .then(() => console.log("Product Service registered with Service Registry"));

app.listen(PORT, () => {
  console.log(`Product Service running on http://localhost:${PORT}`);
});
