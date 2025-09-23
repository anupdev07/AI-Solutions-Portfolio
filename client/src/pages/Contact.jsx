import React, { useState } from "react";
import axios from "axios";

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
      console.error(err);
      setStatus("Failed to send message.");
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Want to inquire? Fill out the form and we’ll get back to you.</h2>
      <form className="card card-dark p-4" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Job Details"
            name="jobDetails"
            rows="3"
            value={formData.jobDetails}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Your message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Send Inquiry
        </button>
        <p className="mt-3 text-muted">{status}</p>
      </form>
    </div>
  );
}
