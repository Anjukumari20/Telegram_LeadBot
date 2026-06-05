import { Link } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      login(res.data);

      navigate("/leads");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="auth-container">
      <button className="loginBtn" onClick={() => navigate("/")}>
        Bot
      </button>
      <div className="auth-card">
        <div className="auth-header">
          <h1>📋 Lead Dashboard</h1>
          <p>Welcome back! Sign in to continue.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign In
          </button>
          <button
            type="submit"
            className="auth-btn-demo"
            onClick={() => {
              setEmail("demo@gmail.com");
              setPassword("csnjknskjcos89f8heihie89n98njkjn");
            }}
          >
            Demo
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
