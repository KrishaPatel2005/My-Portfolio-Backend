// client/src/api.js
import axios from "axios";

// ✅ Define backend base URL (use .env first, then fallback)
const baseURL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:3000/api";

// ✅ Create axios instance
const API = axios.create({
  baseURL,
  timeout: 10000,
});

// ✅ Automatically attach token if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========================
// 🧠 AUTH FUNCTIONS
// ========================

// 🩷 Register (Sign Up)
export const registerUser = async (data) => {
  try {
    const res = await API.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    console.error("❌ Signup error:", error);
    throw error.response?.data || { message: "Signup failed" };
  }
};

// 💜 Login (Sign In)
export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/signin", data);
    return res.data;
  } catch (error) {
    console.error("❌ Signin error:", error);
    throw error.response?.data || { message: "Signin failed" };
  }
};

export default API;

// ========= PROJECTS API ===========

// Get all projects (public)
export const fetchProjects = async () => {
  const res = await API.get("/projects");
  return res.data;
};

// Create a new project (admin only)
export const createProject = async (project) => {
  const res = await API.post("/projects", project);
  return res.data;
};

// Update a project (admin only)
export const updateProject = async (id, project) => {
  const res = await API.put(`/projects/${id}`, project);
  return res.data;
};

// Delete a project (admin only)
export const deleteProject = async (id) => {
  const res = await API.delete(`/projects/${id}`);
  return res.data;
};
