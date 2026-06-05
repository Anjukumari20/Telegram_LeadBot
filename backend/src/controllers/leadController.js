const Lead = require("../models/Lead");

// ─── POST /api/leads ──────────────────────────────────────────
// Save a new lead to the database
async function createLead(req, res) {
  try {
    const { name, email, mobile, telegramId } = req.body;

    // Check if email already exists (duplicate prevention)
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res
        .status(409)
        .json({ error: "A lead with this email already exists" });
    }

    // Create and save the new lead
    const newLead = new Lead({ name, email, mobile, telegramId });
    await newLead.save();

    res.status(201).json({ message: "Lead saved successfully", lead: newLead });
  } catch (error) {
    console.error("Error creating lead:", error.message);
    res.status(500).json({ error: "Server error. Could not save lead." });
  }
}

// ─── GET /api/leads ───────────────────────────────────────────
// Get all leads (with optional search and pagination)
async function getAllLeads(req, res) {
  try {
    // Get query params: ?search=john&page=1&limit=10
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit; // how many records to skip

    // Build a search filter (search by name or email)
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } }, // case-insensitive
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {}; // empty filter means get all

    // Fetch leads from DB
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    // Count total matching leads (for pagination)
    const total = await Lead.countDocuments(filter);

    res.json({
      leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching leads:", error.message);
    res.status(500).json({ error: "Server error. Could not fetch leads." });
  }
}

// ─── GET /api/leads/:id ───────────────────────────────────────
// Get a single lead by its ID
async function getLeadById(req, res) {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    console.error("Error fetching lead:", error.message);
    res.status(500).json({ error: "Server error. Could not fetch lead." });
  }
}

module.exports = { createLead, getAllLeads, getLeadById };
