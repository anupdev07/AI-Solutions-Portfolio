import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setStatus("Your inquiry has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-container text-light">
      <h2 className="text-center fw-bold mb-4" style={{ color: "var(--baby-powder)" }}>
        Want to inquire? Fill out the form and we’ll get back to you via email.
      </h2>

      <form onSubmit={handleSubmit} className="card card-custom p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Subject of your inquiry"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-custom w-100">Submit</button>

        {status && <p className="mt-3 text-center">{status}</p>}
      </form>
    </div>
  );
}

export default Contact;
