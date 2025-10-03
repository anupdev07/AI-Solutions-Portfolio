

 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Services.css";
import { FaDotCircle, FaIndustry, FaRegAddressBook, FaRegAddressCard } from "react-icons/fa";

export default function Home() {
  const API_URL = "http://localhost:5000";

  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const today = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= today);
  const [projects, setProjects] = useState([]);
useEffect(() => {
  axios.get(`${API_URL}/api/projects`).then((res) => {
    setProjects(res.data);
  });
}, []);

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }
  useEffect(() => {
    fetchBlogs();
    fetchServices();
    fetchEvents();
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
                <p className="text small mb-2 italic"><FaRegAddressBook/> {p.clientName}</p>
                <p className="card-text">{p.summary}</p>
                {/* add https:// in links if not present */}
                <a
                  href={p.link.startsWith("https://") ? p.link : `https://${p.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light btn-sm mt-2"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        ))
    )}
  </div>
  <div className="text-center mt-4">
    <a href="/projects" className="btn btn-outline-light">
      See More Projects
    </a>
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
                    <p>{b.excerpt}</p>
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
        {/* only upcoming events fetched from database and check date for confirming it is upcoming */}
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
      <section className="py-5 text-center">
        <h2 className="mb-4">Client Testimonials</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <p>"Amazing service and excellent support!"</p>
                <small>- Client 1</small>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <p>"AI-Solutions helped us transform our workflow."</p>
                <small>- Client 2</small>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <p>"Professional, reliable, and innovative."</p>
                <small>- Client 3</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      Gallery Section
      
    </div>
  );
}
