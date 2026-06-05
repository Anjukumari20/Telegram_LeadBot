import { useNavigate } from "react-router-dom";

// Displays a single lead as a card in the list
function LeadCard({ lead }) {
  const navigate = useNavigate();

  // Format date nicely: e.g. "June 4, 2025"
  const date = new Date(lead.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/leads/${lead._id}`)}
      title="Click to view details"
    >
      <h3 style={styles.name}>{lead.name}</h3>
      <p style={styles.info}>📧 {lead.email}</p>
      <p style={styles.info}>📱 {lead.mobile}</p>
      <p style={styles.date}>🗓 {date}</p>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    transition: "box-shadow 0.2s",
    marginBottom: "12px",
  },
  name: {
    margin: "0 0 8px 0",
    fontSize: "18px",
    color: "#1e293b",
  },
  info: {
    margin: "4px 0",
    color: "#475569",
    fontSize: "14px",
  },
  date: {
    margin: "8px 0 0 0",
    color: "#94a3b8",
    fontSize: "13px",
  },
};

export default LeadCard;
