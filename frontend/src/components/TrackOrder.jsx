import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const targetOrderId = location.state?.targetOrderId;
  const customerName = localStorage.getItem("customerName") || "Guest";

  // --- NEW: WAITER SUMMON HANDLER ---
  const handleSummon = async (type) => {
    try {
      await axios.post("http://localhost:8081/api/service/summon", {
        orderId: targetOrderId || (orders[0]?.id),
        customerName: customerName,
        requestType: type
      });
      alert(`🔔 Waiter notified! Someone is coming with ${type} shortly.`);
    } catch (err) {
      console.error("Summon failed", err);
      alert("Service is currently busy. Please wave to a staff member.");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/orders/customer/${customerName}`
        );
        
        let data = response.data;
        if (targetOrderId) {
          data = data.filter(order => order.id === targetOrderId);
        } else {
          data = data.sort((a, b) => b.id - a.id).slice(0, 1);
        }

        setOrders(data);

        // --- AUTO-REDIRECT LOGIC ---
        // Checks if waiter updated status to SERVED or DELIVERED
        if (data.length > 0 && (data[0].status === "SERVED" || data[0].status === "DELIVERED")) {
          setTimeout(() => {
            navigate("/feedback", { state: { orderId: data[0].id } });
          }, 1000);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Poll every 5 seconds
    
    return () => clearInterval(interval);
  }, [customerName, targetOrderId, navigate]);

  // UI Button Styles
  const summonBtnStyle = {
    padding: "10px 20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    transition: "all 0.2s"
  };

  if (loading) return <div style={{textAlign: "center", marginTop: "50px"}}>Updating Status...</div>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "sans-serif", padding: "20px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ textAlign: "center", marginBottom: "30px", padding: "20px", background: "#f8f9fa", borderRadius: "10px", border: "1px solid #ddd" }}>
        <h2>Customer: <span style={{ color: "#e67e22" }}>{customerName}</span></h2>
        <p style={{ margin: 0, fontSize: "1.1rem", color: "#27ae60", fontWeight: "bold" }}>
          Current Status: {orders[0]?.status || "Processing"}
        </p>
      </div>

      {/* ORDER CARD */}
      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #eee", padding: "25px", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", backgroundColor: "#fff", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ margin: 0 }}>Order #{order.id}</h3>
            <span style={{ 
                background: (order.status === "SERVED" || order.status === "DELIVERED") ? "#d4edda" : "#fff4e5", 
                color: (order.status === "SERVED" || order.status === "DELIVERED") ? "#155724" : "#f39c12",
                padding: "5px 15px", borderRadius: "20px", fontWeight: "bold"
            }}>
              {order.status}
            </span>
          </div>
          <p style={{ color: "#666" }}>Your food is being prepared with care!</p>
        </div>
      ))}

      {/* --- NEW: CONTEXTUAL SUMMON SECTION --- */}
      <div style={{
        marginTop: "30px",
        padding: "25px",
        background: "#fff9db",
        borderRadius: "15px",
        textAlign: "center",
        border: "1px solid #ffeeba"
      }}>
        <h4 style={{ margin: "0 0 15px 0", color: "#856404", fontSize: "1.2rem" }}>🛎️ Table Service</h4>
        <p style={{ margin: "0 0 20px 0", color: "#856404", fontSize: "0.9rem" }}>Need something? Click a button and we'll be right there.</p>
        
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button 
            onClick={() => handleSummon("Water")} 
            onMouseOver={(e) => e.target.style.background = "#f1f1f1"}
            onMouseOut={(e) => e.target.style.background = "#fff"}
            style={summonBtnStyle}>💧 Water
          </button>
          
          <button 
            onClick={() => handleSummon("Cleaning")} 
            onMouseOver={(e) => e.target.style.background = "#f1f1f1"}
            onMouseOut={(e) => e.target.style.background = "#fff"}
            style={summonBtnStyle}>🧹 Clean Table
          </button>
          
          <button 
            onClick={() => handleSummon("The Bill")} 
            onMouseOver={(e) => e.target.style.background = "#f1f1f1"}
            onMouseOut={(e) => e.target.style.background = "#fff"}
            style={summonBtnStyle}>🧾 Bring Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;