import React from "react";
import "../index.css";

export default function Education() {
  return (
    <section id="education" className="section edu-section">
      <div className="container">
        <h2 className="section-title xl">Education</h2>

        <div className="edu-timeline">
          <div className="edu-item" data-aos="fade-up" data-aos-delay="100">
            <div className="edu-dot"></div>
            <div className="edu-card">
              <h3 className="edu-degree">
                Software Engineering Technology (Advanced Diploma)
              </h3>
              <div className="edu-meta">
                <span className="edu-school">
                  Centennial College — Toronto, Canada
                </span>
                <span className="edu-date">Sept 2024 – Apr 2027</span>
              </div>
              <ul className="edu-list">
                <li>
                  Focused on full-stack web and mobile application development.
                </li>
                <li>
                  Hands-on experience with React, Node.js, Java, SQL, and PL/SQL.
                </li>
                <li>
                  Coursework includes Software Design, Databases, and Cloud
                  Computing.
                </li>
              </ul>
            </div>
          </div>

          <div className="edu-item" data-aos="fade-up" data-aos-delay="200">
            <div className="edu-dot"></div>
            <div className="edu-card">
              <h3 className="edu-degree">Higher Secondary (Science Stream)</h3>
              <div className="edu-meta">
                <span className="edu-school">
                  Shree Swaminarayan International School— Gujarat, India
                </span>
                <span className="edu-date">2021 – 2023</span>
              </div>
              <ul className="edu-list">
                <li>
                  Completed with Computer Science, Physics, Chemistry,
                  Mathematics and Biology
                </li>
                <li>Engaged in coding workshops and school technology fairs.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section-divider" data-aos="fade-up"></div>

        <div className="more-about" data-aos="fade-up" data-aos-delay="300">
          <h3 className="sub-title">More About Me</h3>
          <p>
            I’m a passionate developer who loves transforming ideas into
            meaningful digital experiences. I enjoy combining creative design
            with strong technical logic to craft websites that feel intuitive and
            visually appealing.
          </p>
          <p>
            When I’m not coding, I enjoy exploring design trends, teaching
            students online, and learning new tools that enhance accessibility
            and inclusivity in tech.
          </p>
          <p>
            My long-term goal is to grow into a front-end or full-stack developer
            role, work on creative products, and eventually build my own digital
            solutions for local businesses.
          </p>

          <a
            href="/assets/KrishaPatel_Resume.pdf"
            className="btn btn-primary resume-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-download"></i> Download My Resume
          </a>
        </div>
      </div>
    </section>
  );
}
