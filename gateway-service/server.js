// gatewayService.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8760;

// Define API endpoints with defaults
const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:3001/orders";
const PAYMENT_SERVICE_URL =
  process.env.PAYMENT_SERVICE_URL || "http://localhost:3002/payments";
const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:3003/products";

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle requests to the Order Service
app.use("/orders", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: ORDER_SERVICE_URL,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Route to handle requests to the Payment Service
app.use("/payments", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: PAYMENT_SERVICE_URL,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Route to handle requests to the Product Service
app.use("/products", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: PRODUCT_SERVICE_URL,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Gateway Service is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Gateway Service running on http://localhost:${PORT}`);
  console.log(`Order Service URL: ${ORDER_SERVICE_URL}`);
  console.log(`Payment Service URL: ${PAYMENT_SERVICE_URL}`);
  console.log(`Product Service URL: ${PRODUCT_SERVICE_URL}`);
});
