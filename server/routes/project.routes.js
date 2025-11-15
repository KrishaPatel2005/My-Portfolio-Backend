// server/routes/project.routes.js

import express from "express";
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from "../controllers/project.controller.js";
import { requireSignin, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Public Routes
 * - Everyone can view projects
 */
router.route("/")
  .get(listProjects);

/**
 * Admin Routes (protected)
 * - Only Admin can create, update, or delete
 */
router.route("/")
  .post(requireSignin, requireAdmin, createProject)
  .delete(requireSignin, requireAdmin, deleteAllProjects);

router.route("/:id")
  .get(getProject) // public: anyone can view a single project
  .put(requireSignin, requireAdmin, updateProject)
  .delete(requireSignin, requireAdmin, deleteProject);

export default router;
