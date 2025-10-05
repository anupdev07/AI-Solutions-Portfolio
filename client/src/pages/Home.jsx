import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Services.css";
import { FaRegAddressBook, FaMapMarkerAlt, FaTools, FaUserCircle } from "react-icons/fa";

export default function Home() {
  const API_URL = "http://localhost:5000";

  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const today = new Date();
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/projects`).then((res) => {
      setProjects(res.data);
    });
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchServices();
    fetchEvents();
    fetchReviews();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data.slice(0, 3)); // only 3 previews
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  async function fetchServices() {
    try {
      const res = await axios.get(`${API_URL}/api/services`);
      setServices(res.data.slice(0, 3)); // only 3 previews
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  }

  async function fetchEvents() {
    try {
      const res = await axios.get(`${API_URL}/api/events`);
      setEvents(res.data.slice(0, 3)); // only 3 previews
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }

  async function fetchReviews() {
    try {
      const res = await axios.get(`${API_URL}/api/reviews`);
      setReviews(res.data.filter((r) => r.status === "approved"));
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  const upcoming = events.filter((e) => new Date(e.date) >= today);

  const topReviews = reviews
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="container py-5">
      {/* Top Section: About Company */}
      <div className="row align-items-center mb-5">
        {/* Left: Big Heading + CTA */}
        <div className="col-md-6 mb-4">
          <h1 className="fw-bold display-5" style={{ color: "var(--baby-powder)" }}>
            SkyRocket <br /> business with AI-Solutions
          </h1>
          <p className="mt-3" style={{ color: "var(--davys-gray)", fontSize: "1.1rem" }}>
            We're reimagining the IT and AI industry, and we need exceptional people 
            and businesses to help us grow together.
          </p>
          <Link to="/contact" className="btn btn-custom btn-lg mt-3">
            Contact us today
          </Link>
        </div>

        {/* Right: Description */}
        <div className="col-md-6">
          <p style={{ color: "var(--baby-powder)" }}>
            Backed by innovation and a strong vision, AI-Solutions is one of the fastest growing 
            IT and AI-driven solution providers in Nepal. 
          </p>
          <p style={{ color: "var(--baby-powder)" }}>
            By deeply studying workflows across industries, we design and deliver 
            software solutions that empower organizations to work smarter and 
            achieve greater results.
          </p>
          <p style={{ color: "var(--baby-powder)" }}>
            Join us if you value innovation, collaboration, and want to 
            transform how businesses adopt AI and IT services.
          </p>
        </div>
      </div>

      {/* Bottom Section: Scrolling Logos. Feature Logo Uploaded companys from projects table */}
      <div className="logos-container mt-5">
        
        <div className="logos-slide">
        {/* <img src="/src/assets/company1.png" alt="Company 1" />
          <img src="/src/assets/company2.png" alt="Company 2" />
          <img src="/src/assets/company3.png" alt="Company 3" />
          <img src="/src/assets/company4.png" alt="Company 4" />
          <img src="/src/assets/company5.png" alt="Company 5" />
          <img src="/src/assets/company6.png" alt="Company 5" /> */}
          {projects
            .filter((p) => p.logo)
            .map((p) => (
              <img
                key={p._id}
                src={`${API_URL}/uploads/projects/${p.logo}`}
                alt={p.title}
              />
            ))}
        </div>
        
        {/* Fetched from company's logo from project table */}
        <div className="logos-slide">
          {/* <img src="/src/assets/company1.png" alt="Company 1" />
          <img src="/src/assets/company2.png" alt="Company 2" />
          <img src="/src/assets/company3.png" alt="Company 3" />
          <img src="/src/assets/company4.png" alt="Company 4" />
          <img src="/src/assets/company5.png" alt="Company 5" />
          <img src="/src/assets/company6.png" alt="Company 5" /> */}
          {projects
            .filter((p) => p.logo)
            .map((p) => (
              <img
                key={p._id}
                src={`${API_URL}/uploads/projects/${p.logo}`}
                alt={p.title}
              />
            ))}
        </div>
      </div>
<br></br>
<br></br>


      {/* Services Preview */}
      <section className="py-5">
        <h2 className="mb-4 text-center">Our Services</h2>
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
        <div className="text-center mt-3">
          <Link to="/services" className="btn btn-outline-light">
            Learn More
          </Link>
        </div>
      </section>
{/* Featured Projects Preview */}
<div className="container py-5">
  <h2 className="mb-4 text-center">Our Projects</h2>
  <div className="row">
    {projects.filter((p) => p.featured).length === 0 ? (
      <p className="text-muted text-center">No featured projects yet.</p>
    ) : (
      projects
        .filter((p) => p.featured)
        .slice(0, 3)
        .map((p) => (
          <div key={p._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-lg bg-dark text-light border-0 rounded-3 overflow-hidden position-relative project-card">
              {/* Cover Image */}
              {p.coverImage && (
                <img
                  src={`${API_URL}/uploads/projects/${p.coverImage}`}
                  alt={p.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              {/* Logo overlay with black shadow */}
              {p.logo && (
                <img
                  src={`${API_URL}/uploads/projects/${p.logo}`}
                  alt="logo"
                  className="rounded-circle border border-3 border-white position-absolute"
                  style={{
                    width: "70px",
                    height: "70px",
                    top: "150px",
                    left: "20px",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                />
              )}

              <div className="card-body mt-4">
                <h5 className="card-title">{p.title}</h5>
                <p className="text small mb-2 italic"><FaRegAddressBook /> {p.clientName}</p>
                <p className="card-text">{p.summary}</p>
                <Link
                  to="/projects"
                  className="btn btn-outline-light btn-sm mt-2"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))
    )}
  </div>
  <div className="text-center mt-4">
    <Link to="/projects" className="btn btn-outline-light">
      See More Projects
    </Link>
  </div>
</div>

      {/* Blog Preview */}
      <section className="py-5">
        <h2 className="mb-4 text-center">Latest Blogs</h2>
        <div className="row">
          {blogs.length === 0 ? (
            <p className="text-center">No blogs yet.</p>
          ) : (
            blogs.map((b) => (
              <div key={b._id} className="col-md-4 mb-3">
                <div className="card bg-dark text-light h-100 shadow-sm">
                  {b.coverImage && (
                    <img
                      src={`${API_URL}/uploads/blogs/${b.coverImage}`}
                      alt="cover"
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h5>{b.title}</h5>
                    <p style={{ color: "#e6e6e6" }}>{b.excerpt}</p>
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
                        {(b.author?.username || "A")[0].toUpperCase()}
                      </div>
                      <span className="small text-white-50">
                       {b.author?.username || b.author || "Admin"} &bull;{" "}
                      {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <center>
                      <Link to={`/blog/${b.slug}`} className="btn btn-outline-light">
                        Read More
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-3">
          <Link to="/blog" className="btn btn-outline-light">
            See More
          </Link>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-5">
        <h2 className="mb-4 text-center">Upcoming Events</h2>
        <div className="row">
          {upcoming.length === 0 ? (
            <p>No upcoming events.</p>
          ) : (
            upcoming.map((event) => (
              <div key={event._id} className="col-md-4 mb-4">
                <div className="card upcoming-card h-100">
                  {event.coverImage && (
                    <img
                      src={`${API_URL}/uploads/events/${event.coverImage}`}
                      alt={event.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body text-light">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">
                      📅 {formatDate(event.date)} <br />
                      📍 {event.venue}
                    </p>
                    <p className="small text">"{event.description}"</p>
                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-outline-light"
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-3">
          <Link to="/events" className="btn btn-outline-light">
            See More
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <div className="py-5">
        <h2 className="mb-4 text-center">What Our Clients Say</h2>
        <div className="row justify-content-center">
          {topReviews.length === 0 ? (
            <p className="text-center text-muted">No reviews available yet.</p>
          ) : (
            topReviews.map((r) => (
              <div key={r._id} className="col-md-4 mb-4 d-flex">
                <div
                  className="card bg-dark text-light border-0 shadow-lg rounded-4 flex-fill h-100 position-relative review-card"
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
                          background: r.satisfactionScore >= 8
                            ? "#28a745"
                            : r.satisfactionScore >= 5
                            ? "#ffc107"
                            : "#dc3545",
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
            )))}
          {topReviews.length === 0 && (<p className="text-center">No reviews yet.</p>)}
        </div>
        <div className="text-center mt-3">
          <Link to="/reviews" className="btn btn-outline-light">
            Read All Reviews
          </Link>
        </div>
      </div>

      
      
      
    </div>
  );
}
