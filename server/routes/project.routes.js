import express from "express";
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from "../controllers/project.controller.js";

const router = express.Router();

router.route("/")
  .get(listProjects)
  .post(createProject)
  .delete(deleteAllProjects);

router.route("/:id")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

export default router;
