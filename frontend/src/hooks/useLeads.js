import { useState, useEffect } from "react";
import { getLeads } from "../services/api";

// Custom hook to fetch leads list
// This keeps the data-fetching logic separate from the UI
function useLeads(search, page) {
  const [leads, setLeads] = useState([]);       // list of leads
  const [total, setTotal] = useState(0);        // total count
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // show spinner
  const [error, setError] = useState(null);     // show error message

  useEffect(() => {
    // Define the fetch function
    async function fetchLeads() {
      setLoading(true);
      setError(null);

      try {
        const data = await getLeads(search, page);
        setLeads(data.leads);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // always stop loading
      }
    }

    fetchLeads();
  }, [search, page]); // re-run whenever search or page changes

  return { leads, total, totalPages, loading, error };
}

export default useLeads;
