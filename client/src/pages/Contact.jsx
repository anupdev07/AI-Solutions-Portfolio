
import React, { useState } from "react";
import axios from "axios";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
export default function Contact() {
  const API_URL = "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    jobTitle: "",
    jobDetails: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        jobTitle: "",
        jobDetails: "",
        message: "",
      });
    } catch (err) {
      setStatus("Failed to send message.");
    }
  }

  return (
    <div className="contact-hero-section py-5 rounded" style={{background: "linear-gradient(120deg, #1a1a1f 60%, #222 100%)", minHeight: 220, margin: "0px", padding: "32px"}}>
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h1 className="display-5 fw-bold" style={{color: "var(--vermilion)"}}>Connect with Our Team of Experts</h1>
            <p className="lead text-light mt-3 mb-4" style={{maxWidth: 600}}>
              You are just one submit away! Whether you have a question about our services, projects, or anything else, our team is ready to answer all your questions.

            </p>
            <div className="d-flex flex-wrap gap-4 align-items-center">
              
            </div>
          </div>
          <div className="col-lg-5 text-center">
            <img src="/src/assets/logo.png" alt="Contact" className="img-fluid rounded shadow-lg" style={{maxHeight: 220, objectFit: "cover"}} />
          </div>
        </div>

        <div className="row g-5">
          <div className="col-md-6">
            <div className="card card-custom p-4 shadow-lg h-100">
              <h3 className="mb-4" style={{color: "var(--vermilion)"}}>Get in Touch</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input className="form-control" name="name" type="text" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input className="form-control" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input className="form-control" name="phone" type="text" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Company</label>
                  <input className="form-control" name="company" type="text" value={formData.company} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input className="form-control" name="country" type="text" value={formData.country} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Job Title</label>
                  <input className="form-control" name="jobTitle" type="text" value={formData.jobTitle} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Job Details</label>
                  <input className="form-control" name="jobDetails" type="text" value={formData.jobDetails} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-custom w-100">Send Message</button>
              </form>
              {status && <p className="mt-3 mb-0 small text-center" style={{color: status.includes("success") ? "var(--vermilion)" : "#ffb3b3"}}>{status}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-custom p-4 shadow-lg h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="mb-3" style={{color: "var(--vermilion)"}}>Our Details</h4>
                <p className="mb-2"><b>AI Solutions Headquarters</b></p>
                <p className="mb-2">Kalikanagar-11<br/>Butwal, Nepal</p>
                
                <p className="mb-2"><span className="fw-bold">Email:</span> <a href="mailto:contact@aisolutions.com" style={{color: "var(--vermilion)"}}>contact@aisolutions.com</a></p>
                <p className="mb-2"><span className="fw-bold">Phone:</span> <a href="tel:+11234567890" style={{color: "var(--vermilion)"}}>+977 9800000000</a></p>
                {/* Google maps Butwal Preview here */}
                <div className="map-preview" style={{width: "100%", height: 500, borderRadius: 8, overflow: "hidden"}}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1234567890123!2d83.45000001500001!3d27.700000025000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399596c123456789%3A0xabcdef1234567890!2sKalikanagar%2C%20Butwal%2011000%2C%20Nepal!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AI Solutions Location"
                  ></iframe>
                </div>
                <a href="https://maps.google.com/?q=Kalikanagar-11+Butwal" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm mt-2">View on Map</a>
              
              <div className="mt-4">
                <h6 className="mb-2" style={{color: "var(--vermilion)"}}>Follow Us</h6>
                  <div className="d-flex gap-3">
                  <a href="https://www.linkedin.com/company/ai-solutions" style={{color: "var(--baby-powder)", fontSize: 22}}><FaLinkedin /></a>
                  <a href="https://www.facebook.com/aisolutions" style={{color: "var(--baby-powder)", fontSize: 22}}><FaFacebook /></a>
                  <a href="https://www.twitter.com/aisolutions" style={{color: "var(--baby-powder)", fontSize: 22}}><FaTwitter /></a>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
