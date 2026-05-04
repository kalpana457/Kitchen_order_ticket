import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ChefDashboard.css";

const ChefDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get("http://localhost:8081/api/orders")
      .then(res => {
        // Show PENDING, PAID, and PREPARING orders
        const filtered = res.data.filter(
          o => o.status === "PENDING" || o.status === "PAID" || o.status === "PREPARING"
        );
        setOrders(filtered);
      })
      .catch(err => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/orders/${id}/status?status=READY`);
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="chef-light-wrapper">
      <header className="chef-light-header">
        <div className="header-left">
          <h1>👨‍🍳 Kitchen Queue</h1>
          <p className="subtitle">Managing active orders in real-time</p>
        </div>
        <div className="live-status">
          <span className="pulse-dot"></span> LIVE
        </div>
      </header>

      <div className="chef-grid">
        {orders.length === 0 ? (
          <div className="empty-queue">
            <p>No pending orders. Everything is up to date!</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className={`chef-card ${order.status.toLowerCase()}`}>
              <div className="card-header">
                <span className="order-number">Order #{order.id}</span>
                <span className="customer-name">{order.customerName}</span>
              </div>

              <div className="status-row">
                <span className="status-label">Status:</span>
                <span className={`status-value ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              
              <ul className="item-list">
                {order.items && order.items.map((item, index) => (
                  <li key={index}>
                    <span className="item-count">{item.quantity}x</span>
                    <span className="item-title">{item.menuItem?.name || "Item"}</span>
                  </li>
                ))}
              </ul>

              <button
                className="complete-btn"
                onClick={() => updateStatus(order.id)}
              >
                Mark as Ready
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChefDashboard;