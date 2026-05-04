import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FeedbackPage.css"; // Ensure you create a CSS file for this

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the orderId passed from the TrackOrder page redirect
  const { orderId } = location.state || {};
  
  // Auto-fill the name from localStorage
  const storedName = localStorage.getItem("customerName") || "Guest";

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Sending feedback linked to the specific customer and order
      await axios.post("http://localhost:8081/api/feedback", {
        customerName: storedName,
        orderId: orderId, // Useful if your backend Feedback entity has an orderId field
        rating: parseInt(rating),
        comment: comment,
      });

      alert("Thank you! Your feedback helps us improve.");
      
      // After feedback, clear the tracking session and go back to Menu
      navigate("/menu");
      
    } catch (error) {
      console.error("Feedback error:", error);
      alert("Could not submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-card">
        <div className="feedback-header">
          <h2>⭐ Rate Your Meal</h2>
          <p>We hope you enjoyed Order <strong>#{orderId || "N/A"}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              value={storedName}
              disabled // Keep it disabled so they don't change the name linked to the order
              className="read-only-input"
            />
          </div>

          <div className="form-group">
            <label>How was the food & service?</label>
            <div className="star-rating-container">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`star-btn ${rating >= num ? "active" : ""}`}
                  onClick={() => setRating(num)}
                >
                  ★
                </button>
              ))}
              <span className="rating-text">
                {rating === 5 ? "Excellent!" : rating === 1 ? "Poor" : "Good"}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Your Comments</label>
            <textarea
              placeholder="Tell us what you liked or what we can improve..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-feedback-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;