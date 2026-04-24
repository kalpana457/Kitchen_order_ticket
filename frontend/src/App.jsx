// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import CustomerRegister from "./components/CustomerRegister";
import Menu from "./components/Menu";
import StaffLogin from "./components/StaffLogin";
import ChefDashboard from "./components/ChefDashboard";
import WaiterDashboard from "./components/WaiterDashboard";
import AdminDashboard from "./components/AdminDashboard";
import TrackOrder from "./components/TrackOrder";
import PaymentPage from "./components/PaymentPage";
import FeedbackPage from "./components/FeedbackPage";
import "./App.css";

// ✅ Simple Protected Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/staff-login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        {/* ✅ Protected Routes */}
        <Route
          path="/chef"
          element={
            <PrivateRoute>
              <ChefDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/waiter"
          element={
            <PrivateRoute>
              <WaiterDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;