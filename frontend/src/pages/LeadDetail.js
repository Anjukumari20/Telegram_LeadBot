import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeadById } from "../services/api";
import Navbar from "../components/Navbar";

function LeadDetail() {
  const { id } = useParams();         // get ID from URL like /leads/abc123
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLead() {
      try {
        const data = await getLeadById(id);
        setLead(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLead();
  }, [id]); // re-run if ID changes

  if (loading) return <p style={styles.message}>⏳ Loading...</p>;
  if (error)   return <p style={styles.error}>❌ {error}</p>;
  if (!lead)   return <p style={styles.message}>Lead not found.</p>;

  const date = new Date(lead.createdAt).toLocaleString("en-IN");

  return (
    <>
      <Navbar />
    <div style={styles.container}>
      {/* Back button */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      <div style={styles.card}>
        <h2 style={styles.heading}>Lead Details</h2>

        <div style={styles.row}>
          <span style={styles.label}>👤 Name</span>
          <span style={styles.value}>{lead.name}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>📧 Email</span>
          <span style={styles.value}>{lead.email}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>📱 Mobile</span>
          <span style={styles.value}>{lead.mobile}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>🤖 Telegram ID</span>
          <span style={styles.value}>{lead.telegramId}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>🗓 Submitted</span>
          <span style={styles.value}>{date}</span>
        </div>
      </div>
    </div>
    </>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "0 auto", padding: "24px" },
  backBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#2563eb",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "16px",
    padding: 0,
  },
  card: {
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "24px",
  },
  heading: { fontSize: "22px", color: "#1e293b", marginBottom: "20px" },
  row: {
    display: "flex",
    borderBottom: "1px solid #f1f5f9",
    padding: "12px 0",
    gap: "16px",
  },
  label: {
    width: "140px",
    color: "#64748b",
    fontWeight: "600",
    fontSize: "14px",
    flexShrink: 0,
  },
  value: { color: "#1e293b", fontSize: "15px" },
  message: { textAlign: "center", color: "#64748b", marginTop: "40px" },
  error: { textAlign: "center", color: "#dc2626", marginTop: "40px" },
};

export default LeadDetail;
