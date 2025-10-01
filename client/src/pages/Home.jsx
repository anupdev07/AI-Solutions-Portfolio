

 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Services.css";

export default function Home() {
  const API_URL = "http://localhost:5000";

  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchBlogs();
    fetchServices();
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

      {/* Bottom Section: Scrolling Logos */}
      <div className="logos-container mt-5">
        
        <div className="logos-slide">
          <img src="/src/assets/company1.png" alt="Company 1" />
          <img src="/src/assets/company2.png" alt="Company 2" />
          <img src="/src/assets/company3.png" alt="Company 3" />
          <img src="/src/assets/company4.png" alt="Company 4" />
          <img src="/src/assets/company5.png" alt="Company 5" />
          <img src="/src/assets/company6.png" alt="Company 5" />
        </div>
        
        {/* Duplicate for infinite loop */}
        <div className="logos-slide">
          <img src="/src/assets/company1.png" alt="Company 1" />
          <img src="/src/assets/company2.png" alt="Company 2" />
          <img src="/src/assets/company3.png" alt="Company 3" />
          <img src="/src/assets/company4.png" alt="Company 4" />
          <img src="/src/assets/company5.png" alt="Company 5" />
          <img src="/src/assets/company6.png" alt="Company 5" /> 
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
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <h5>Event 1</h5>
                <p>Placeholder event details go here...</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <h5>Event 2</h5>
                <p>Placeholder event details go here...</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <h5>Event 3</h5>
                <p>Placeholder event details go here...</p>
              </div>
            </div>
          </div>
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
    </div>
  );
}
