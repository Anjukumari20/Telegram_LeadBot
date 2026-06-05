const express = require("express");
const router = express.Router();
const validateLead = require("../middleware/validateLead");
const {
  createLead,
  getAllLeads,
  getLeadById,
} = require("../controllers/leadController");

// POST /api/leads       → validate first, then save
router.post("/", validateLead, createLead);

// GET /api/leads        → get all leads (supports ?search= &page= &limit=)
router.get("/", getAllLeads);

// GET /api/leads/:id    → get one lead by ID
router.get("/:id", getLeadById);

module.exports = router;
