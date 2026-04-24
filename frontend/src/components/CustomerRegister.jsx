import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerRegister.css";

const CustomerRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/customers/register", form);

      setSuccess(true);
      setMessage("Registration Successful 🎉");

      // Redirect to Menu page after 1.5s
      setTimeout(() => {
        navigate("/menu");
      }, 1500);
    } catch (err) {
      console.error(err);
      setSuccess(false);
      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="card-top-bar"></div>

        <div className="register-header" onClick={() => navigate("/")}>
          <span className="reg-logo-icon"></span> KOT SYSTEM
        </div>

        <h2>Create Your Account</h2>
        <p className="subtitle">Join the modern kitchen experience</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-register">Register</button>
        </form>

        {message && (
          <div className={`message-box ${success ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRegister;