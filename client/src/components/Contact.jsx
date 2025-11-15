import React, { useState } from "react";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import API from "../api";

export default function Contact() {
  // 🩷 State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🩷 Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🩷 Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await API.post("/contacts", formData);
      if (res.status === 201) {
        setMessage("Thank you! Your message has been sent successfully 💌");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("❌ Error submitting contact form:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Let's Connect and Collaborate!</h2>

        <div className="contact-grid">
          {/* 🩵 Left Section — Info */}
          <div className="contact-info">
            <p className="contact-description">
              I’m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:krishappatel285@gmail.com">
                  krishappatel285@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-phone"></i>
                <span>+1 (437) 778-8548</span>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>Toronto, Ontario, Canada</span>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/krisha-patel-bba0492a5/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/KrishaPatel2005"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="mailto:krishappatel285@gmail.com"
                className="social-link"
                title="Email"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* 🩷 Right Section — Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                required
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="name">Your Name</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Your Email</label>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                id="message"
                rows="6"
                placeholder=" "
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="message">Your Message</label>
            </div>

            <button type="submit" className="form-submit-btn">
              Send Message
            </button>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
