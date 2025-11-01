import express from "express";
import {
  createQualification,
  listQualifications,
  getQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from "../controllers/qualification.controller.js";

const router = express.Router();

router.route("/")
  .get(listQualifications)
  .post(createQualification)
  .delete(deleteAllQualifications);

router.route("/:id")
  .get(getQualification)
  .put(updateQualification)
  .delete(deleteQualification);

export default router;
