import React from "react";
import "../index.css";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container" data-aos="fade-up">
        <h2 className="section-title">About Me</h2>

        <p className="about-intro">
          I’m a passionate <strong>Software Engineering Technology</strong> student at
          Centennial College with a strong interest in front-end development,
          creative UI design, and full-stack web applications. My goal is to
          create elegant, responsive, and accessible solutions that bring ideas
          to life.
        </p>

        <div className="about-details">
          <p>
            I specialize in <strong>React.js</strong>, <strong>Java</strong>,
            and <strong>SQL/PL-SQL</strong> development, combining technical
            skills with creative problem-solving. I enjoy transforming complex
            code into beautiful and user-friendly designs.
          </p>
          <p>
            Apart from coding, I’m passionate about UI/UX aesthetics, continuous
            learning, and collaborating on innovative projects that make a real
            impact.
          </p>
        </div>

        <div className="highlight-box">
          <h3>✨ Core Values & Work Style</h3>
          <ul>
            <li>💡 Always learning and evolving with new technologies.</li>
            <li>🎨 Blending logic with creativity in every project.</li>
            <li>🤝 Believing in teamwork, growth, and attention to detail.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
