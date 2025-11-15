import React from "react";
import "../index.css";

export default function Services() {
  const services = [
    {
      icon: "fa-solid fa-code",
      title: "Web Development",
      desc: "Designing and building responsive, user-friendly websites using React, Node.js, and modern frameworks that adapt beautifully to all screen sizes.",
    },
    {
      icon: "fa-solid fa-palette",
      title: "UI/UX Design",
      desc: "Creating clean and intuitive interfaces that balance functionality with elegance — ensuring every user interaction feels effortless and aesthetic.",
    },
    {
      icon: "fa-solid fa-mobile-screen",
      title: "App Prototyping",
      desc: "Building interactive app prototypes in Figma and React to visualize user flows, test designs, and turn creative ideas into functional mockups.",
    },
    {
      icon: "fa-solid fa-database",
      title: "Database Management",
      desc: "Developing structured databases using MySQL and MongoDB — focused on efficient queries, clean data architecture, and seamless API integration.",
    },
  ];

  return (
    <section id="services" className="section services-section">
      <div className="container" data-aos="fade-up">
        <h2 className="section-title xl">Services</h2>
        <p className="section-subtitle">
          What I love building and helping others with.
        </p>

        <div className="services-grid">
          {services.map((srv, i) => (
            <div
              key={i}
              className="service-card"
              data-aos="zoom-in"
              data-aos-delay={i * 150}
            >
              <div className="service-icon">
                <i className={srv.icon}></i>
              </div>
              <h3>{srv.title}</h3>
              <p>{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
