import React from "react";
import "../index.css";
import profile from "../assets/logo.jpg";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-overlay"></div>

      <div className="container hero-grid">
        <div className="hero-content" data-aos="fade-up">
          <p className="hero-subtitle">Hello, I’m</p>
          <h1 className="hero-title">Krisha Patel</h1>
          <p className="hero-description">
            A <strong>Software Engineering Technology</strong> student at
            Centennial College, passionate about building intuitive and
            interactive web applications with a creative, detail-oriented
            approach.
          </p>

          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-eye"></i> View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              <i className="fas fa-paper-plane"></i> Contact Me
            </a>
          </div>
        </div>

        <div className="hero-image" data-aos="fade-left">
          <img src={profile} alt="Krisha Patel" className="profile-photo" />
        </div>
      </div>
    </section>
  );
}
