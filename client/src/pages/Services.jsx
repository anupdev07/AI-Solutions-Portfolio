import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Services.css"; // custom styles

export default function Services() {
  const [services, setServices] = useState([]);
  const API_URL = "http://localhost:5000"; // backend base URL

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
      <h1 className="text-center mb-5">Our Services</h1>
      <div className="row g-4">
        {services.length === 0 ? (
          <p className="text-center text-muted">No services available yet.</p>
        ) : (
          services.map((s) => (
            <div key={s._id} className="col-12 col-md-6 col-lg-4">
              <div className="service-card">
                {s.icon && (
                  <img
                    src={`${API_URL}/uploads/blogs/${s.icon}`}
                    alt="icon"
                    className="service-icon"
                  />
                )}
                <h4>{s.title}</h4>
                <p className="service-desc">{s.description}</p>
                <a href="/contact" >
                <span className="service-badge">{s.category}</span> </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
