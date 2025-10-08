import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Services.css";

export default function Services() {
  const [services, setServices] = useState([]);
  const API_URL = "https://ai-solutions-portfolio.onrender.com";

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const res = await axios.get(`${API_URL}/api/services`);
      setServices(res.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  }

  return (
    <div className="services-page container py-5">
      <h1 className="text-center mb-2 fw-bold" style={{ letterSpacing: 1 }}>
        Our Services
      </h1>
      <p
        className="lead text-center mb-5"
        style={{ color: "#ffb366" }}
      >
        We deliver innovative solutions in web, AI, automation, and more. Explore
        what we can do for you!
      </p>
      <div className="row g-4">
        {services.length === 0 ? (
          <p className="text-center text-muted">No services available yet.</p>
        ) : (
          services.map((s) => (
            <div key={s._id} className="col-12 col-md-6 col-lg-4 d-flex">
              <div className="service-card-modern flex-fill d-flex flex-column align-items-center text-center shadow-lg rounded-4 p-4 bg-dark position-relative h-100">
                {s.icon && (
                  <div className="service-icon-circle mb-3">
                    <img
                      src={`${API_URL}/uploads/blogs/${s.icon}`}
                      alt="icon"
                      className="service-icon-img"
                    />
                  </div>
                )}
                <h4 className="fw-bold mb-2" style={{ color: "#fff" }}>
                  {s.title}
                </h4>
                <span className="service-badge-modern mb-3">
                  {s.category}
                </span>
                <p
                  className="service-desc mb-4"
                  style={{ color: "#ccc" }}
                >
                  {s.description}
                </p>
                <a
                  href="/contact"
                  className="btn btn-outline-warning rounded-pill px-4 fw-semibold mt-auto"
                  style={{ borderColor: "#ff4d29", color: "#ffb366" }}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
