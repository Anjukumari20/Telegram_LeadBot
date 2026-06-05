// This middleware checks if the lead data is valid before saving

function validateLead(req, res, next) {
  const { name, email, mobile, telegramId } = req.body;

  // Check all fields are present
  if (!name || !email || !mobile || !telegramId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check email format using a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Check mobile: must be numbers only and at least 10 digits
  const mobileRegex = /^\d{10,}$/;
  if (!mobileRegex.test(mobile)) {
    return res
      .status(400)
      .json({ error: "Mobile must be numeric and at least 10 digits" });
  }

  // If everything is fine, move to the next function (controller)
  next();
}

module.exports = validateLead;
