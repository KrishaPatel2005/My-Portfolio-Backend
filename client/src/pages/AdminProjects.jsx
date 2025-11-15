import "../index.css";
import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import { getToken } from "../auth";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = getToken();

  // Load all projects
  const loadProjects = useCallback(async () => {
    try {
      const res = await API.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("❌ Error loading projects:", err);
    }
  }, [token]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Create a new project
  const handleCreate = async () => {
    if (!title.trim()) return alert("Please enter a title");

    try {
      await API.post(
        "/projects",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setDescription("");
      loadProjects();
      alert("Project added!");
    } catch (err) {
      console.error("❌ Create error:", err);
      alert("Error creating project");
    }
  };

  // Delete a project
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadProjects();
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Could not delete project.");
    }
  };

  return (
    <div
      style={{
        paddingTop: "120px",   // fixes header overlap
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingBottom: "50px",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Admin: Manage Projects</h1>

      {/* Form Section */}
      <div className="admin-form" style={{ marginBottom: "40px" }}>
        <h3>Add New Project</h3>

        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          onClick={handleCreate}
          style={{
            background: "linear-gradient(to right, #e75480, #9b59b6)",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Project
        </button>
      </div>

      <hr />

      {/* Project List Section */}
      <h3 style={{ marginTop: "20px" }}>Existing Projects</h3>

      {projects.length === 0 && <p>No projects found.</p>}

      <ul className="admin-project-list" style={{ padding: "0", marginTop: "15px" }}>
        {projects.map((p) => (
          <li
            key={p._id}
            style={{
              listStyle: "none",
              padding: "15px",
              marginBottom: "10px",
              background: "#ffffff22",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <strong>{p.title}</strong> — {p.description}
            </span>

            <button
              className="delete-btn"
              onClick={() => deleteProject(p._id)}
              style={{
                background: "#e75480",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
