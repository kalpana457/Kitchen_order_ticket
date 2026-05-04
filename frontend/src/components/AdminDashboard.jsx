import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------ FETCH ALL ORDERS ------------------
  const fetchOrders = () => {
    axios.get("http://localhost:8081/api/orders")
      .then(res => {
        // Sort by newest ID first for better administrative oversight
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setOrders(sorted);
      })
      .catch(err => console.error("Admin fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 15 seconds to keep revenue stats live
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  // ------------------ DELETE ORDER ------------------
  const deleteOrder = async (id) => {
    if (window.confirm(`Permanently delete Order #${id} from the records?`)) {
      try {
        await axios.delete(`http://localhost:8081/api/orders/${id}`);
        fetchOrders();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Could not delete order. Ensure the backend supports DELETE requests.");
      }
    }
  };

  // ------------------ DATA CALCULATIONS ------------------
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const completedCount = orders.filter(o => o.status === "DELIVERED" || o.status === "SERVED").length;

  if (loading) return <div className="admin-loading-screen">Loading System Logs...</div>;

  return (
    <div className="admin-page-wrapper">
      <header className="admin-main-header">
        <div className="header-branding">
          <h1>📊 Admin Control Panel</h1>
          <p>Real-time KOT History & Revenue Tracking</p>
        </div>
        
        <div className="admin-top-stats">
          <div className="stat-box revenue">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-number">₹{totalRevenue}</span>
          </div>
          <div className="stat-box served">
            <span className="stat-label">Orders Served</span>
            <span className="stat-number">{completedCount}</span>
          </div>
          <div className="stat-box total">
            <span className="stat-label">Total Records</span>
            <span className="stat-number">{orders.length}</span>
          </div>
        </div>
      </header>

      <div className="admin-list-container">
        {orders.length === 0 ? (
          <div className="empty-db-message">No order records found in the database.</div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="admin-data-row">
              {/* Identification Column */}
              <div className="admin-col-info">
                <span className="order-id-label">#ID {order.id}</span>
                <span className="customer-name-label">{order.customerName}</span>
              </div>

              {/* Status Column */}
              <div className="admin-col-status">
                <span className={`admin-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              {/* Items Column - Fixed data mapping */}
              <div className="admin-col-items">
                {order.items?.map((item, i) => (
                  <span key={i} className="admin-item-pill">
                    {item.menuItem?.name || "Standard Item"} <b>x{item.quantity}</b>
                  </span>
                ))}
              </div>

              {/* Actions & Financials Column */}
              <div className="admin-col-finance">
                <span className="admin-row-amount">₹{order.totalAmount}</span>
                <button 
                  className="admin-row-delete"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;