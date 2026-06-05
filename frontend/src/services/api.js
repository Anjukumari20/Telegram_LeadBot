// Base URL of our backend API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ─── Get all leads (with optional search and pagination) ──────
export async function getLeads(search = "", page = 1, limit = 10) {
  // Build the URL with query params
  const url = `${API_URL}/api/leads?search=${search}&page=${page}&limit=${limit}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}

// ─── Get a single lead by ID ──────────────────────────────────
export async function getLeadById(id) {
  const response = await fetch(`${API_URL}/api/leads/${id}`);

  if (!response.ok) {
    throw new Error("Lead not found");
  }

  return response.json();
}
