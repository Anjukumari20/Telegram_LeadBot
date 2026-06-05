// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./services/db");
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");
const startBot = require("./bot/bot");

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
// Allow requests from frontend (React runs on port 3000)
app.use(cors(
  {
    origin: "http://localhost:3000",
  }
));

// Parse incoming JSON requests
app.use(express.json());


// ─── Routes ──────────────────────────────────────────────────
// All lead-related routes start with /api/leads
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

// Simple health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// ─── Start Server ─────────────────────────────────────────────
// First connect to MongoDB, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`);
  });

  // Start the Telegram Bot
  startBot();
});
