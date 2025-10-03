import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Gallery.css";

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [fullscreenImg, setFullscreenImg] = useState(null);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await axios.get(`${API_URL}/api/events`);
      setEvents(res.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }

  // Collect categories from events
  const categories = ["All", ...new Set(events.map((e) => e.title))];

  // Collect images depending on active category
  let images = [];
  events.forEach((e) => {
    if (activeCategory === "All" || e.title === activeCategory) {
      e.images?.forEach((img) =>
        images.push({ src: `${API_URL}/uploads/events/${img}`, category: e.title })
      );
    }
  });

  return (
    <div className="container py-5 text-light">
      <h1 className="mb-4">Event Gallery</h1>

      {/* Categories */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn ${activeCategory === cat ? "btn-warning" : "btn-outline-light"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="row">
        {images.length === 0 ? (
          <p>No images available.</p>
        ) : (
          images.map((img, i) => (
            <div key={i} className="col-md-3 col-sm-6 mb-4">
              <div className="gallery-card">
                <img
                  src={img.src}
                  alt={img.category}
                  className="img-fluid gallery-img"
                  onClick={() => setFullscreenImg(img.src)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fullscreen Overlay */}
      {fullscreenImg && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenImg(null)}>
          <button
            className="btn btn-danger close-btn"
            onClick={() => setFullscreenImg(null)}
          >
            ✕
          </button>
          <img src={fullscreenImg} alt="fullscreen" className="fullscreen-img" />
        </div>
      )}
    </div>
  );
}
