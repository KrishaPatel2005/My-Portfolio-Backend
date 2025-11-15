// server/routes/qualification.routes.js
import express from "express";
import {
  createQualification,
  listQualifications,
  getQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
} from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js"; // Use same as contacts

const router = express.Router();

/**
 * 📜 Public routes
 * - Anyone can view qualifications (frontend display)
 */
router.get("/api/qualifications", listQualifications);
router.get("/api/qualifications/:id", getQualification);

/**
 * 🔒 Admin routes
 * - Only signed-in admin can manage qualifications
 */
router.post("/api/qualifications", authCtrl.requireSignin, createQualification);
router.put("/api/qualifications/:id", authCtrl.requireSignin, updateQualification);
router.delete("/api/qualifications/:id", authCtrl.requireSignin, deleteQualification);
router.delete("/api/qualifications", authCtrl.requireSignin, deleteAllQualifications);

export default router;
