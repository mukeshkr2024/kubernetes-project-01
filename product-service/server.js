const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3003; // Use the port from env or default to 3003

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
  .then(() => console.log("Product Service registered with Service Registry"))
  .catch((error) => console.error("Failed to register service:", error));

// Database URL (you can use it in your application logic as needed)
const DB_URL = process.env.DB_URL; // Set the database URL from env

app.listen(PORT, () => {
  console.log(`Product Service running on http://localhost:${PORT}`);
  console.log(`Database URL: ${DB_URL}`); // Optional: log the DB URL
});
