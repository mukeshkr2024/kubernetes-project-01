// paymentService.js
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const app = express();
const PORT = 3002;

app.use(bodyParser.json());

// In-memory store for payments
const payments = {};

// Process a new payment
app.post("/payments", (req, res) => {
  const { orderId, amount } = req.body;
  const paymentId = uuidv4();
  payments[paymentId] = { paymentId, orderId, amount, status: "completed" };
  res.status(201).json({ message: "Payment processed", paymentId });
});

// Get all payments
app.get("/payments", (req, res) => {
  res.json(Object.values(payments));
});

// Register this service with the Service Registry
axios
  .post("http://localhost:8761/register", {
    name: "PaymentService",
    host: "localhost",
    port: PORT,
  })
  .then(() => console.log("Payment Service registered with Service Registry"));

app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
});
