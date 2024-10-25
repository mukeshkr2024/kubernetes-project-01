const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 8761;

// Middleware
app.use(bodyParser.json());

// In-memory store for registered services
const services = {};

// Register a new service
app.post("/register", (req, res) => {
  const { name, host, port } = req.body;
  const id = uuidv4();

  if (!name || !host || !port) {
    return res
      .status(400)
      .json({ error: "Service name, host, and port are required" });
  }

  services[id] = { id, name, host, port, timestamp: Date.now() };
  res
    .status(201)
    .json({ message: `Service ${name} registered with ID: ${id}`, id });
});

// Get list of all services
app.get("/services", (req, res) => {
  res.json(Object.values(services));
});

// Unregister a service
app.delete("/unregister/:id", (req, res) => {
  const { id } = req.params;
  if (services[id]) {
    delete services[id];
    res.json({ message: `Service with ID: ${id} unregistered successfully` });
  } else {
    res.status(404).json({ error: "Service not found" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Service Registry is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Service Registry running on http://localhost:${PORT}`);
});
