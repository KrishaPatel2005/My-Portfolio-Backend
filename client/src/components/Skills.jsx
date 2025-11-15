import React, { useEffect } from "react";
import "../index.css";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "fa-solid fa-code",
      skills: [
        { name: "HTML / CSS / JavaScript", percent: 95 },
        { name: "React.js / Vite", percent: 90 },
        { name: "Bootstrap / Tailwind", percent: 85 },
      ],
    },
    {
      title: "Backend Development",
      icon: "fa-solid fa-server",
      skills: [
        { name: "Node.js / Express.js", percent: 85 },
        { name: "MongoDB / MySQL", percent: 80 },
        { name: "RESTful APIs", percent: 88 },
      ],
    },
    {
      title: "Programming Languages",
      icon: "fa-solid fa-terminal",
      skills: [
        { name: "Java", percent: 85 },
        { name: "C#", percent: 80 },
        { name: "Python", percent: 78 },
      ],
    },
    {
      title: "Tools & Platforms",
      icon: "fa-solid fa-toolbox",
      skills: [
        { name: "Git / GitHub", percent: 92 },
        { name: "Visual Studio / VS Code", percent: 88 },
        { name: "Figma / Canva", percent: 83 },
      ],
    },
  ];

  useEffect(() => {
    const fills = document.querySelectorAll(".skill-progress");
    fills.forEach((fill) => {
      const width = fill.getAttribute("data-width");
      fill.style.width = `${width}%`;
    });
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="container" data-aos="fade-up">
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-grid">
          {skillCategories.map((cat, index) => (
            <div
              className="skill-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <h3>
                <i className={cat.icon}></i> {cat.title}
              </h3>

              {cat.skills.map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-label">
                    <span>{skill.name}</span>
                    <span>{skill.percent}%</span>
                  </div>

                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      data-width={skill.percent}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
