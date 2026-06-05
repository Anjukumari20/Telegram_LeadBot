const mongoose = require("mongoose");

// This function connects our app to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit the process if DB connection fails
    process.exit(1);
  }
}

module.exports = connectDB;
