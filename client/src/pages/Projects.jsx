import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAddressBook, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaTools, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await axios.get(`${API_URL}/api/projects`);
      // Featured projects first
      const sorted = res.data.sort((a, b) => (b.featured === true) - (a.featured === true));
      setProjects(sorted);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }

  const handleToggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center fw-bold" style={{ letterSpacing: 1 }}>Our Projects</h1>
      <div className="row">
        {projects.length === 0 ? (
          <p className="text text-center">No projects yet.</p>
        ) : (
          projects.map((p) => (
            <div key={p._id} className="col-md-6 col-lg-4 mb-4">
              <div
                className="card h-100 shadow-lg bg-dark text-light border-0 rounded-4 overflow-hidden project-card position-relative"
                style={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: p.featured ? "2px solid #ff4d29" : "none",
                  boxShadow: p.featured
                    ? "0 0 0 3px rgba(255,77,41,0.15), 0 8px 32px rgba(0,0,0,0.25)"
                    : "0 4px 24px rgba(0,0,0,0.15)",
                }}
              >
                {/* Featured badge */}
                {p.featured && (
                  <span
                    className="badge position-absolute"
                    style={{
                      top: 12,
                      right: 12,
                      background: "#ff4d29",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1rem",
                      zIndex: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    <FaStar className="me-1" /> Featured
                  </span>
                )}

                {/* Date badge */}
                {p.date && (
                  <span
                    className="badge position-absolute"
                    style={{
                      top: 12,
                      left: 12,
                      background: "#23272b",
                      color: "#ffb366",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      zIndex: 2,
                    }}
                  >
                    <FaCalendarAlt className="me-1" />
                    {formatDate(p.date)}
                  </span>
                )}

                {p.coverImage && (
                  <img
                    src={`${API_URL}/uploads/projects/${p.coverImage}`}
                    alt={p.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover", borderBottom: "2px solid #23272b" }}
                  />
                )}

                {p.logo && (
                  <img
                    src={`${API_URL}/uploads/projects/${p.logo}`}
                    alt="logo"
                    className="rounded-circle border border-3 border-white position-absolute"
                    style={{
                      width: "70px",
                      height: "70px",
                      top: "160px",
                      left: "20px",
                      objectFit: "contain",
                      backgroundColor: "#fff",
                      zIndex: 2,
                    }}
                  />
                )}

                <div className="card-body mt-4 pb-2">
                  <h5 className="card-title fw-semibold d-flex align-items-center" style={{ minHeight: 48 }}>
                    {p.title}
                  </h5>
                  
                  {p.location && (
                    <p className="text small mb-2">
                      <FaMapMarkerAlt className="me-1 text-info" /> {p.location}
                    </p>
                  )}
                  {p.technologies && (
                    <p className="text small mb-2">
                      <FaTools className="me-1 text-success" />{" "}
                      {Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies}
                    </p>
                  )}
                  {p.status && (
                    <p className="text small mb-2">
                      <span className="badge bg-secondary">{p.status}</span>
                    </p>
                  )}
                  <p className="card-text">{p.summary}</p>
                  {/* card will extend and details of project visible when cliecked Readmore */}
                  {expandedId === p._id && (
                    <div className="project-details mt-2">
                      <hr  />
                      {/* Show details */}
                      <p className="card-text mb-2">{p.details}</p>
                      {/* Show more info */}
                      <ul className="list-unstyled mb-2">
                        {p.date && (
                          <li className="mb-1">
                            <FaCalendarAlt className="me-2 text-warning" />
                            <strong>Date:</strong> {formatDate(p.date)}
                          </li>
                        )}
                        {p.year && (
                          <li className="mb-1">
                            <FaCalendarAlt className="me-2 text-primary" />
                            <strong>Year:</strong> {p.year}
                          </li>
                        )}
                        {p.clientName && (
                          <li className="mb-1">
                            <FaAddressBook className="me-2 text-info" />
                            <strong>Client:</strong> {p.clientName}
                          </li>
                        )}
                        {p.location && (
                          <li className="mb-1">
                            <FaMapMarkerAlt className="me-2 text-danger" />
                            <strong>Location:</strong> {p.location}
                          </li>
                        )}
                        {p.technologies && (
                          <li className="mb-1">
                            <FaTools className="me-2 text-success" />
                            <strong>Technologies:</strong>{" "}
                            {Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies}
                          </li>
                        )}
                        {p.status && (
                          <li className="mb-1">
                            <span className="badge bg-secondary">
                              <strong>Status:</strong> {p.status}
                            </span>
                          </li>
                        )}
                      </ul>
                      {p.link && (
                        <a
                          href={p.link.startsWith("http") ? p.link : `https://${p.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-warning btn-sm mt-2"
                          
                        >
                          View Project <FaExternalLinkAlt className="ms-1" />
                        </a>
                      )}
                    </div>
                  )}
                  <button
                    className="btn btn-link text-info p-0 fw-semibold"
                    onClick={() => handleToggleDetails(p._id)}
                  >
                    {expandedId === p._id ? "Show less" : "Read more"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
