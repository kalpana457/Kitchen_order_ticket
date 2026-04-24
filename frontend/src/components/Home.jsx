import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import kotImage from "../assets/images/kot.png"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Top Navigation Bar */}
      <header className="home-header">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">K</span> KOT SYSTEM
        </div>
        <nav className="home-navbar">
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/staff-login")}>Staff Login</li>
            <li onClick={() => navigate("/register")}>Customer Register</li>
          </ul>
        </nav>
        <button className="btn-outline" onClick={() => navigate("/register")}>
          GET STARTED
        </button>
      </header>

      {/* Hero Content */}
      <main className="home-content">
        <div className="hero-section">
          <div className="home-text">
            <h1>Kitchen Order Ticket System</h1>
            <p>
              Manage your restaurant orders efficiently and in real-time! 
              Eliminate manual errors, speed up kitchen communication, and 
              provide a seamless experience for your staff and customers.
            </p>

            {/* Buttons for roles */}
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navigate("/register")}>
                REGISTER NOW
              </button>
              
            </div>
          </div>

          <div className="home-image-container">
            <img 
              src={kotImage} 
              alt="Kitchen Order Ticket Interface" 
              className="home-image" 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;