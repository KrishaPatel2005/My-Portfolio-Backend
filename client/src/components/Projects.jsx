// client/src/components/Projects.jsx
import React, { useEffect, useState } from "react";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api";
import { getUser } from "../auth"; // <-- we created this in auth.js

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // admin form state
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const user = getUser(); // null if not logged in

  // 1) Load projects from backend on first render
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError("");
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Could not load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 2) Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3) Handle create / update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.title.trim()) {
        alert("Title is required");
        return;
      }

      if (editingId) {
        // update existing project
        const updated = await updateProject(editingId, form);
        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? updated : p))
        );
        alert("Project updated ✅");
      } else {
        // create new project
        const created = await createProject(form);
        setProjects((prev) => [...prev, created]);
        alert("Project created ✅");
      }

      // reset form
      setForm({ title: "", description: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Save project error:", err);
      alert("Something went wrong while saving. Please check console.");
    }
  };

  // 4) Start editing a project
  const startEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      description: project.description || "",
    });
  };

  // 5) Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      alert("Project deleted ✅");
    } catch (err) {
      console.error("Delete project error:", err);
      alert("Could not delete project. Please check console.");
    }
  };

  // 6) loading & error display
  if (loading) {
    return (
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <p style={{ textAlign: "center" }}>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section">
      <div id="project-sparkles"></div>
      <div className="container" data-aos="fade-up">
        <h2 className="section-title">Projects</h2>

        {error && (
          <p style={{ color: "#ff8080", textAlign: "center", marginBottom: 20 }}>
            {error}
          </p>
        )}

        {/* ==== ADMIN PANEL – only if logged in AND role === 'admin' ==== */}
        {user && user.role === "admin" && (
          <div
            className="admin-panel"
            style={{
              marginBottom: "40px",
              padding: "20px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, rgba(231,84,128,0.15), rgba(155,89,182,0.15))",
              boxShadow: "0 0 25px rgba(0,0,0,0.4)",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                fontSize: "1.4rem",
                letterSpacing: "0.05em",
              }}
            >
              Admin – Manage Projects
            </h3>
            <p style={{ marginBottom: "15px", fontSize: "0.9rem" }}>
              {editingId
                ? "Update the project and click Save."
                : "Add a new project to your portfolio."}
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "500px",
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={form.title}
                onChange={handleChange}
                required
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #7f5af0",
                  background: "#17091f",
                  color: "#fff",
                }}
              />
              <textarea
                name="description"
                placeholder="Short description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #7f5af0",
                  background: "#17091f",
                  color: "#fff",
                }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 18px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      "linear-gradient(90deg, #e75480 0%, #9b59b6 100%)",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {editingId ? "Save Changes" : "Add Project"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ title: "", description: "" });
                    }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "999px",
                      border: "1px solid #ff9ff3",
                      cursor: "pointer",
                      background: "transparent",
                      color: "#ff9ff3",
                      fontWeight: 500,
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ==== PROJECT CARDS ==== */}
        <div className="projects-grid">
          {projects.map((proj) => (
            <div
              className="project-card"
              key={proj._id}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="project-icon">
                <i className="fa-solid fa-code"></i>
              </div>

              <h3>{proj.title}</h3>
              <p>{proj.description}</p>

              {/* Admin controls on each card */}
              {user && user.role === "admin" && (
                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    gap: "8px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => startEdit(proj)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      border: "1px solid #7f5af0",
                      background: "transparent",
                      color: "#c3b6ff",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fa-solid fa-pen"></i> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(proj._id)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      border: "1px solid #ff6b81",
                      background: "transparent",
                      color: "#ff6b81",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {projects.length === 0 && !error && (
            <p style={{ textAlign: "center", width: "100%", marginTop: 20 }}>
              No projects yet. (Admins can add one above!)
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
