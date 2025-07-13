// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/telemetrydb";

// Prometheus metrics
const telemetryCounter = new client.Counter({
  name: "telemetry_received_total",
  help: "Total number of telemetry requests received",
});

const telemetryDuration = new client.Histogram({
  name: "telemetry_received_duration_seconds",
  help: "Duration of telemetry request processing in seconds",
  buckets: [0.1, 0.5, 1, 2, 5],
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("🟢 Connected to MongoDB DB:", mongoose.connection.name);

  // Start Express server only after DB connected
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("🔴 MongoDB connection error:", err);
});

// Define telemetry schema and model
const telemetrySchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  data: mongoose.Schema.Types.Mixed,
});
const Telemetry = mongoose.model("Telemetry", telemetrySchema);

// Middleware
app.use(express.json());

// Telemetry POST endpoint
app.post("/telemetry", async (req, res) => {
  const end = telemetryDuration.startTimer();
  telemetryCounter.inc();

  console.log("📡 Telemetry Received:", req.body);

  try {
    const entry = new Telemetry({ data: req.body });
    await entry.save();
    res.status(201).json({ message: "Telemetry received and stored" });
  } catch (err) {
    console.error("Error saving telemetry:", err);
    res.status(500).json({ error: "Failed to store telemetry" });
  }

  end();
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.end(metrics);
  } catch (ex) {
    res.status(500).end(ex);
  }
});

