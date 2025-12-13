// client/src/components/AddProjectForm.jsx
import React, { useState } from "react";
import API from "../api";

function AddProjectForm({ onProjectAdded, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    tools: "",
    icon: "fa-solid fa-code",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        tools: formData.tools.split(",").map((t) => t.trim()),
      };
      const res = await API.post("/projects", formattedData);
      alert("✅ Project added successfully!");
      onProjectAdded(res.data);
      onClose();
    } catch (err) {
      console.error("Add project error:", err);
      alert("❌ Failed to add project. Check console.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "450px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>➕ Add New Project</h3>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />

        <input
          type="text"
          name="tools"
          placeholder="Tools (comma-separated)"
          value={formData.tools}
          onChange={handleChange}
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />

        <input
          type="text"
          name="link"
          placeholder="Project Link"
          value={formData.link}
          onChange={handleChange}
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />

        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "gray",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              background: "linear-gradient(to right, #e75480, #9b59b6)",
              color: "#fff",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}





export default AddProjectForm;
