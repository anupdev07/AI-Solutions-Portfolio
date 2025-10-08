import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const API_URL = "https://ai-solutions-portfolio.onrender.com";

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  const getInitial = (name) => name?.[0]?.toUpperCase() || "A";

  return (
    <div
      className="container py-5"
      style={{ background: "#181b1f", minHeight: "100vh" }}
    >
      <h1
        className="text-center mb-2 fw-bold"
        style={{ letterSpacing: 1, color: "#fff" }}
      >
        Our Blogs
      </h1>
      <p className="lead text-center mb-5" style={{ color: "#bdbdbd" }}>
        Insights, stories, and updates from our team.
      </p>
      <div className="row g-4">
        {blogs.length === 0 ? (
          <p className="text-center text-muted">No blogs yet.</p>
        ) : (
          blogs.map((b) => (
            <div key={b._id} className="col-12 col-md-6 col-lg-4 d-flex">
              <div
                className="card shadow-sm rounded-4 bg-dark text-light border-0 flex-fill h-100 blog-card-minimal position-relative"
                style={{
                  border: "1.5px solid #23272b",
                  transition: "transform 0.18s, box-shadow 0.18s, border 0.18s",
                  background: "#23272b",
                }}
              >
                {b.coverImage && (
                  <img
                    src={`${API_URL}/uploads/blogs/${b.coverImage}`}
                    alt="cover"
                    className="card-img-top"
                    style={{
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  {/* Category badge */}
                  {b.category && (
                    <span
                      className="badge mb-2"
                      style={{
                        background: "#23272b",
                        color: "#FFD700",
                        fontWeight: 500,
                        fontSize: "0.93rem",
                        borderRadius: "1em",
                        alignSelf: "flex-start",
                        border: "1px solid #FFD700",
                        letterSpacing: 0.5,
                      }}
                    >
                      {b.category}
                    </span>
                  )}
                  <h5
                    className="card-title fw-bold mb-2"
                    style={{ minHeight: 56, color: "#fff" }}
                  >
                    {b.title}
                  </h5>
                  <div className="d-flex align-items-center mb-2">
                    <div
                      className="me-2 d-flex align-items-center justify-content-center"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "#23272b",
                        color: "#FFD700",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        border: "1.5px solid #FFD700",
                      }}
                    >
                      {(b.author?.username || b.author || "A")[0].toUpperCase()}
                    </div>
                    <span className="small text-white-50">
                      {b.author?.username || b.author || "Admin"} &bull;{" "}
                      {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className="card-text mb-3"
                    style={{ color: "#e6e6e6" }}
                  >
                    {b.excerpt}
                  </p>
                  <Link
                    to={`/blog/${b.slug}`}
                    className="btn btn-outline-warning rounded-pill mt-auto px-4 fw-semibold"
                    style={{
                      borderColor: "#ffffffff",
                      color: "#FFD700",
                      background: "transparent",
                      transition: "background 0.18s, color 0.18s, border 0.18s",
                    }}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <style>{`
        .blog-card-minimal:hover {
          transform: translateY(-4px) scale(1.01);
          border: 1.5px solid #ffffffff !important;
          box-shadow: 0 8px 32px rgba(255,215,0,0.07), 0 8px 32px rgba(0,0,0,0.18);
          z-index: 2;
        }
        .btn-outline-warning:hover, .btn-outline-warning:focus {
          background: #ff4d29 !important;
          color: #fff !important;
          border-color: #ff4d29 !important;
        }
      `}</style>
    </div>
  );
}
