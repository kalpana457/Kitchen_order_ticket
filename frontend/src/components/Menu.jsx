import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Show All");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const customerName = localStorage.getItem("customerName") || "Guest";

  useEffect(() => {
    axios.get("http://localhost:8081/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching menu:", err));
  }, []);

  const displayItems = () => {
    if (selectedCategory === "Show All") {
      return categories.flatMap(cat => cat.items || []);
    }
    const found = categories.find(cat => cat.categoryName === selectedCategory);
    return found ? found.items : [];
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, change) => {
    setCart(prevCart => {
      const updated = prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + change } : item
      );
      return updated.filter(item => item.quantity > 0);
    });
  };

  const subTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round(subTotal * 0.05); 
  const finalTotal = subTotal + tax;

  const handleBillAndPayment = async () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    const orderData = {
      customerName,
      totalAmount: finalTotal,
      status: "UNPAID",
      items: cart.map(item => ({ menuItem: { id: item.id }, quantity: item.quantity }))
    };
    try {
      const response = await axios.post("http://localhost:8081/api/orders", orderData);
      navigate("/payment", { state: { orderId: response.data.id, amount: finalTotal } });
    } catch (err) {
      alert("Backend Error: Ensure STS is running.");
    }
  };

  return (
    <div className="pos-layout">
      <div className="menu-column">
        <div className="user-welcome">Welcome, <strong>{customerName}</strong>!</div>
        
        {/* --- IMPROVED CATEGORY PILLS --- */}
        <div className="category-filter-bar">
          <button 
            className={`filter-btn ${selectedCategory === "Show All" ? "active" : ""}`} 
            onClick={() => setSelectedCategory("Show All")}
          >
            Show All
          </button>
          {categories.map(cat => (
            <button 
              key={cat.category_id} 
              className={`filter-btn ${selectedCategory === cat.categoryName ? "active" : ""}`} 
              onClick={() => setSelectedCategory(cat.categoryName)}
            >
              {cat.categoryName}
            </button>
          ))}
        </div>

        {/* --- IMPROVED CARD GRID --- */}
        <div className="menu-pos-grid">
          {displayItems().map(item => (
            <div key={item.id} className="menu-pos-card">
              <div className="menu-item-image-wrapper">
                <img 
                  src={`/images/${item.imageUrl || 'default.jpg'}`} 
                  alt={item.name} 
                  className="menu-item-img"
                  onError={(e) => e.target.src = '/images/default.jpg'} 
                />
              </div>
              <div className="card-info">
                <h3>{item.name}</h3>
                <p className="card-price">₹{item.price}</p>
              </div>
              <button className="add-pos-btn" onClick={() => addToCart(item)}>+</button>
            </div>
          ))}
        </div>
      </div>

      {/* --- IMPROVED SIDEBAR --- */}
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>🛒 Add to Cart</h3>
        </div>

        <div className="cart-items-list">
          {cart.map(item => (
            <div key={item.id} className="cart-item-block">
              <div className="cart-item-info">
                <strong>{item.name}</strong>
                <span>₹{item.price * item.quantity}</span>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span> <span>₹{subTotal}</span>
          </div>
          <div className="summary-row">
            <span>GST (5%):</span> <span>₹{tax}</span>
          </div>
          <div className="summary-total-row">
            <label>Total:</label> <span className="total-value">₹{finalTotal}</span>
          </div>
        </div>

        <div className="cart-action-buttons">
          <button className="bill-payment-btn" onClick={handleBillAndPayment}>
            Bill & Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;