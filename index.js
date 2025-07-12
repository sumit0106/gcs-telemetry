require("dotenv").config();
const express = require("express");
const app = express();
const prometheus = require("express-prometheus-middleware");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(prometheus({
  metricsPath: "/metrics",
  collectDefaultMetrics: true,
}));

app.post("/telemetry", (req, res) => {
  console.log("Telemetry Received:", req.body);
  res.status(200).json({ message: "Telemetry received" });
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
