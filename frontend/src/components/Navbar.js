import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        📋 Lead Dashboard
      </Link>
      <button style={{ marginLeft: "auto", background: "transparent", border: "none", color: "white", cursor: "pointer" }}>
        <Link to="/logout" style={{ color: "white", textDecoration: "none" }}>
          Logout
        </Link>
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#2563eb",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  brand: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default Navbar;
