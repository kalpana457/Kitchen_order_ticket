import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentPage.css"; 

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract orderId and amount sent from the Menu component
  const { orderId, amount } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  // Security check: Redirect if the page is accessed without order data
  if (!orderId || !amount) {
    return (
      <div className="error-container">
        <p>Invalid session. Please return to the menu.</p>
        <button onClick={() => navigate("/menu")}>Back to Menu</button>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send payment data to the backend
      // This matches the @PostMapping("/{orderId}/payment") in OrderController
      await axios.post(`http://localhost:8081/api/orders/${orderId}/payment`, {
        paymentMethod,
        amount
      });

      alert(`Payment successful via ${paymentMethod.toUpperCase()}!`);
      
      // 2. Clear the cart from localStorage so the next customer starts fresh
      localStorage.removeItem("cart"); 
      
      // 3. Navigate to the track page and PASS the specific orderId
      // This allows TrackOrder.jsx to filter for ONLY this specific ID
      navigate("/track", { state: { targetOrderId: orderId } }); 

    } catch (err) {
      console.error("Payment failed:", err.response || err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page-wrapper">
      <div className="payment-card">
        <div className="payment-header">
          <h1>Payment for Order #{orderId}</h1>
          <div className="amount-badge">₹{amount}</div>
        </div>

        <div className="payment-body">
          <label htmlFor="paymentMethod" className="input-label">
            Select Payment Method
          </label>
          <select
            id="paymentMethod"
            className="payment-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">💳 Credit/Debit Card</option>
            <option value="upi">📱 UPI / PhonePe / GPay</option>
            <option value="cash">💵 Cash on Delivery</option>
          </select>

          <button
            className={`pay-button ${loading ? "loading" : ""}`}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Complete Payment"}
          </button>
        </div>
        
        <p className="secure-text">🔒 Secure SSL Encrypted Transaction</p>
      </div>
    </div>
  );
};

export default PaymentPage;