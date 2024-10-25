// configServer.js
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8765;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get configuration values
app.get("/config/:service", (req, res) => {
  const service = req.params.service;

  // Define configurations for each service
  const configs = {
    orders: {
      apiUrl: process.env.ORDER_SERVICE_URL || "http://localhost:3001/orders",
      databaseUrl:
        process.env.ORDER_DATABASE_URL || "mongodb://localhost:27017/orders",
    },
    payments: {
      apiUrl:
        process.env.PAYMENT_SERVICE_URL || "http://localhost:3002/payments",
      databaseUrl:
        process.env.PAYMENT_DATABASE_URL ||
        "mongodb://localhost:27017/payments",
    },
    products: {
      apiUrl:
        process.env.PRODUCT_SERVICE_URL || "http://localhost:3003/products",
      databaseUrl:
        process.env.PRODUCT_DATABASE_URL ||
        "mongodb://localhost:27017/products",
    },
  };

  // Check if the requested service configuration exists
  if (configs[service]) {
    res.json(configs[service]);
  } else {
    res.status(404).json({ error: "Service configuration not found" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Config Server is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Config Server running on http://localhost:${PORT}`);
  // / Log the configurations for each service
  console.log("Service configurations:");
  console.log(
    `Order Service URL: ${
      process.env.ORDER_SERVICE_URL || "http://localhost:3001/orders"
    }`
  );
  console.log(
    `Payment Service URL: ${
      process.env.PAYMENT_SERVICE_URL || "http://localhost:3002/payments"
    }`
  );
  console.log(
    `Product Service URL: ${
      process.env.PRODUCT_SERVICE_URL || "http://localhost:3003/products"
    }`
  );
});
