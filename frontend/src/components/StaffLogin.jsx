import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StaffLogin.css";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8081/api/staff/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.data && res.data.role) {
        const role = res.data.role.toUpperCase();
        localStorage.setItem("token", "loggedin");
        localStorage.setItem("role", role);

        // Redirect logic
        if (role === "CHEF") navigate("/chef");
        else if (role === "WAITER") navigate("/waiter");
        else if (role === "ADMIN") navigate("/admin");
        else alert("Role recognized, but no dashboard assigned.");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check your credentials or backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-login-wrapper">
      <div className="staff-login-card">
        <div className="login-icon">🔐</div>
        <h2>Staff Portal</h2>
        <p className="login-subtitle">Please sign in to access your dashboard</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="chef@kot.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Internal Access Only</p>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;