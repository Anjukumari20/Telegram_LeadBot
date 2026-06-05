import { useState } from "react";
import useLeads from "../hooks/useLeads";
import LeadCard from "../components/LeadCard";
import Navbar from "../components/Navbar";

function LeadList() {
  const [search, setSearch] = useState("");      // what user typed in search box
  const [searchInput, setSearchInput] = useState(""); // the input value before submitting
  const [page, setPage] = useState(1);

  // Use our custom hook to get leads
  const { leads, total, totalPages, loading, error } = useLeads(search, page);

  // When user clicks Search button
  function handleSearch() {
    setSearch(searchInput);
    setPage(1); // go back to first page on new search
  }

  // When user presses Enter in search box
  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  // When user clears the search
  function handleClear() {
    setSearchInput("");
    setSearch("");
    setPage(1);
  }

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <h1 style={styles.heading}>All Leads ({total})</h1>

      {/* ── Search Bar ── */}
      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.btnPrimary}>
          Search
        </button>
        {search && (
          <button onClick={handleClear} style={styles.btnSecondary}>
            Clear
          </button>
        )}
      </div>

      {/* ── Loading State ── */}
      {loading && <p style={styles.message}>⏳ Loading leads...</p>}

      {/* ── Error State ── */}
      {error && (
        <p style={styles.error}>
          ❌ Error: {error}. Is the backend running?
        </p>
      )}

      {/* ── Empty State ── */}
      {!loading && !error && leads.length === 0 && (
        <p style={styles.message}>No leads found.</p>
      )}

      {/* ── Lead Cards ── */}
      {!loading && !error && leads.map((lead) => (
        <LeadCard key={lead._id} lead={lead} />
      ))}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            style={styles.pageBtn}
          >
            ← Previous
          </button>
          <span style={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            style={styles.pageBtn}
          >
            Next →
          </button>
        </div>
      )}
    </div>
    </>
  );
}

const styles = {
  container: { maxWidth: "700px", margin: "0 auto", padding: "24px" },
  heading: { fontSize: "24px", color: "#1e293b", marginBottom: "16px" },
  searchRow: { display: "flex", gap: "8px", marginBottom: "20px" },
  input: {
    flex: 1,
    padding: "10px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "15px",
  },
  btnPrimary: {
    padding: "10px 18px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
  },
  btnSecondary: {
    padding: "10px 18px",
    backgroundColor: "#e2e8f0",
    color: "#475569",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
  },
  message: { color: "#64748b", textAlign: "center", marginTop: "40px" },
  error: { color: "#dc2626", textAlign: "center", marginTop: "40px" },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    marginTop: "24px",
  },
  pageBtn: {
    padding: "8px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  pageInfo: { color: "#475569", fontSize: "14px" },
};

export default LeadList;
