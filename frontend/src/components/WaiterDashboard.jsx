import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WaiterDashboard.css";

const WaiterDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]); // NEW: For Summon Feature
  const [loading, setLoading] = useState(true);

  // ------------------ FETCH ALL DATA ------------------
  const fetchData = async () => {
    try {
      // 1. Fetch Food Orders
      const orderRes = await axios.get("http://localhost:8081/api/orders");
      const readyOrders = orderRes.data.filter(o => o.status === "READY");
      setOrders(readyOrders);

      // 2. Fetch Service Requests (Summons)
      const serviceRes = await axios.get("http://localhost:8081/api/service/active");
      setServiceRequests(serviceRes.data);
      
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // ------------------ ACTIONS ------------------
  const markDelivered = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/orders/${id}/status?status=DELIVERED`);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const completeServiceRequest = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/service/${id}/complete`);
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="waiter-status">Connecting to System...</div>;

  return (
    <div className="waiter-light-wrapper">
      <header className="waiter-light-header">
        <div className="header-info">
          <h1>🤵 Waiter Master Panel</h1>
          <p>Managing Table Service & Food Delivery</p>
        </div>
        <div className="stats-container">
           <div className="stat-badge ready">🍱 {orders.length} Ready</div>
           <div className="stat-badge summon">🛎️ {serviceRequests.length} Calls</div>
        </div>
      </header>

      {/* --- SECTION 1: SERVICE CALLS (SUMMONS) --- */}
      <section className="dashboard-section">
        <h2 className="section-title">🛎️ Active Table Requests</h2>
        <div className="summon-grid">
          {serviceRequests.length === 0 ? (
            <p className="empty-text">No tables currently calling.</p>
          ) : (
            serviceRequests.map(req => (
              <div key={req.id} className="summon-card">
                <div className="summon-info">
                  <span className="summon-type">{req.requestType}</span>
                  <span className="summon-table">Customer: {req.customerName}</span>
                </div>
                <button className="done-btn" onClick={() => completeServiceRequest(req.id)}>I'm on it!</button>
              </div>
            ))
          )}
        </div>
      </section>

      <hr className="divider" />

      {/* --- SECTION 2: FOOD DELIVERY --- */}
      <section className="dashboard-section">
        <h2 className="section-title">🍱 Food Ready for Pickup</h2>
        <div className="waiter-grid">
          {orders.length === 0 ? (
             <div className="empty-state-card"><h3>Kitchen is quiet...</h3></div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="waiter-service-card">
                <div className="service-card-top">
                  <span className="table-number">Order #{order.id}</span>
                  <span className="guest-name">{order.customerName}</span>
                </div>
                <ul className="service-item-list">
                  {order.items?.map((item, i) => (
                    <li key={i}>
                      <span className="service-qty">{item.quantity}x</span>
                      <span className="service-name">{item.menuItem?.name || "Item"}</span>
                    </li>
                  ))}
                </ul>
                <button className="service-deliver-btn" onClick={() => markDelivered(order.id)}>Confirm Delivery</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default WaiterDashboard;