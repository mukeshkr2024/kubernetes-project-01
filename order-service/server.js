// orderService.js
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// In-memory store for orders
const orders = {};

// Create a new order
app.post("/orders", (req, res) => {
  const { productId, quantity, userId } = req.body;
  const orderId = uuidv4();
  orders[orderId] = { orderId, productId, quantity, userId, status: "pending" };
  res.status(201).json({ message: "Order created", orderId });
});

// Get all orders
app.get("/orders", (req, res) => {
  res.json(Object.values(orders));
});

// Register this service with the Service Registry
axios
  .post("http://localhost:8761/register", {
    name: "OrderService",
    host: "localhost",
    port: PORT,
  })
  .then(() => console.log("Order Service registered with Service Registry"));

app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});
