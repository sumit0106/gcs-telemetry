require("dotenv").config();
const express = require("express");
const promClient = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enable default system metrics
promClient.collectDefaultMetrics();

// Custom counter for telemetry
const telemetryCounter = new promClient.Counter({
  name: "telemetry_received_total",
  help: "Total number of telemetry messages received",
});

// Custom histogram for telemetry request duration
const telemetryDuration = new promClient.Histogram({
  name: "telemetry_request_duration_seconds",
  help: "Duration of telemetry POST requests in seconds",
  buckets: [0.05, 0.1, 0.2, 0.5, 1, 2] // Customize as needed
});

// POST /telemetry – Receives drone telemetry data
app.post("/telemetry", async (req, res) => {
  const end = telemetryDuration.startTimer();
  telemetryCounter.inc();

  // Simulate work or process data (optional)
  console.log("📡 Telemetry Received:", req.body);

  res.status(200).json({ message: "Telemetry received" });
  end(); // record duration
});

// /health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// /metrics for Prometheus scraping
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

