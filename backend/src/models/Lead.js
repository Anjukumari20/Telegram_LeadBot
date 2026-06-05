const mongoose = require("mongoose");

// Define what a "Lead" document looks like in MongoDB
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true, // removes extra spaces
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // prevents duplicate emails (bonus feature)
    lowercase: true,
    trim: true,
  },

  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    trim: true,
  },

  telegramId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now, // automatically set to current time
  },
});

// Create the model from the schema
const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
