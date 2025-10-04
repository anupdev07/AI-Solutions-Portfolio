// client/src/pages/Reviews.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Reviews() {
  const API_URL = "http://localhost:5000";
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [satisfactionScore, setSatisfactionScore] = useState(5);
  const [recommend, setRecommend] = useState(false);
  const [message, setMessage] = useState("");

  // CAPTCHA state
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  useEffect(() => {
    fetchReviews();
    generateCaptcha();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/reviews`);
      setReviews(res.data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Simple math CAPTCHA
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion(`What is ${a} + ${b}?`);
    setCaptchaAnswer((a + b).toString());
    setCaptchaInput("");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (captchaInput.trim() !== captchaAnswer) {
      alert("CAPTCHA answer is incorrect. Please try again.");
      generateCaptcha();
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/reviews`,
        { rating, satisfactionScore, recommend, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review submitted successfully!");

      setRating(0);
      setSatisfactionScore(5);
      setRecommend(false);
      setMessage("");
      generateCaptcha();
      fetchReviews();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review.");
      generateCaptcha();
    }
  };

  // Satisfaction color helper
  const getSatisfactionColor = (score) => {
    if (score >= 8) return "#28a745";
    if (score >= 5) return "#ffc107";
    return "#dc3545";
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: 600 }}>
        <h1 className="mb-3 text-center fw-bold" style={{ letterSpacing: 1 }}>Share Your Experience</h1>
        <p className="lead text-center mb-4">Help others by sharing your experience with our services. Your feedback is valuable to us!</p>
        {/* Submit form */}
        {user ? (
          <form
            className="p-4 bg-dark rounded-4 shadow-lg border border-2 border-secondary mb-5"
            onSubmit={submitReview}
            style={{ background: "#181b1f" }}
          >
            <p className="mb-3 fw-semibold fs-5 text-center">How would you rate our service?</p>
            {/* Rating */}
            <div className="mb-4 d-flex justify-content-center align-items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "2.5rem",
                    cursor: "pointer",
                    color: rating >= star ? "#FFD700" : "#444",
                    transition: "color 0.2s",
                  }}
                  onClick={() => setRating(star)}
                  title={`${star} Star${star > 1 ? "s" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
            {/* Satisfaction Score */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Satisfaction Score</label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={satisfactionScore}
                  onChange={(e) => setSatisfactionScore(Number(e.target.value))}
                  className="form-range flex-grow-1"
                  style={{ accentColor: getSatisfactionColor(satisfactionScore) }}
                />
                <span
                  className="badge rounded-pill"
                  style={{
                    background: getSatisfactionColor(satisfactionScore),
                    color: "#fff",
                    fontSize: "1rem",
                    minWidth: 36,
                  }}
                >
                  {satisfactionScore}
                </span>
              </div>
            </div>
            {/* Recommend */}
            <div className="mb-4 form-check d-flex align-items-center gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={recommend}
                onChange={(e) => setRecommend(e.target.checked)}
                id="recommendCheck"
                style={{ cursor: "pointer" }}
              />
              <label className="form-check-label fw-semibold" htmlFor="recommendCheck">
                I recommend this service
              </label>
            </div>
            {/* Message */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Your Review</label>
              <textarea
                className="form-control rounded-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                placeholder="Write your honest feedback here..."
                style={{ background: "#23272b", color: "#fff", border: "1px solid #333" }}
              />
            </div>
            {/* CAPTCHA */}
            <div className="mb-4">
              <label className="form-label fw-semibold">CAPTCHA: {captchaQuestion}</label>
              <input
                type="text"
                className="form-control rounded-3"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                placeholder="Enter your answer"
                style={{ background: "#23272b", color: "#fff", border: "1px solid #333" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-warning w-100 fw-bold rounded-3"
              style={{ letterSpacing: 1, fontSize: "1.1rem" }}
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-warning text-center mb-5">
            Wanna rate us? <a href="/login" className="text-info fw-bold">Login here</a>
          </p>
        )}
      </div>

      {/* Reviews list */}
      <h3 className="mb-4 fw-bold text-center" style={{ letterSpacing: 1 }}>What Others Say</h3>
      <div className="row w-100 justify-content-center">
        {reviews.length === 0 ? (
          <p className="text-center text-muted">No reviews available yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="col-md-4 mb-4 d-flex">
              <div className="card bg-dark text-light border-0 shadow-lg rounded-4 flex-fill h-100 position-relative review-card"
                style={{
                  borderTop: r.recommend ? "4px solid #28a745" : "4px solid #dc3545",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <FaUserCircle size={54} className="mb-2 text-secondary" />
                  <span className="fw-bold text-uppercase mb-1" style={{ letterSpacing: 1 }}>
                    {r.user?.username || "Anonymous"}
                  </span>
                  <div style={{ color: "#FFD700", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    {"★".repeat(r.rating)}
                  </div>
                  <p className="card-text flex-grow-1 fst-italic mb-2" style={{ color: "#ffb366" }}>
                    "{r.message}"
                  </p>
                  <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <span
                      className="badge rounded-pill"
                      style={{
                        background: getSatisfactionColor(r.satisfactionScore),
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                      }}
                    >
                      Satisfaction: {r.satisfactionScore}/10
                    </span>
                    <span className={`badge rounded-pill ${r.recommend ? "bg-success" : "bg-danger"}`}>
                      {r.recommend ? "Recommended" : "Not Recommended"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
