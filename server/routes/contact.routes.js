// server/routes/contact.routes.js
import express from "express";
import {
  createContact,
  listContacts,
  getContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js"; // uses your JWT middleware

const router = express.Router();

/**
 * 📨 Public route:
 * Anyone can submit a contact form
 */
router.post("/api/contacts", createContact);

/**
 * 🔒 Admin-only routes:
 * Only signed-in admin can view or delete contacts
 */
router
  .route("/api/contacts")
  .get(authCtrl.requireSignin, listContacts)
  .delete(authCtrl.requireSignin, deleteAllContacts);

router
  .route("/api/contacts/:id")
  .get(authCtrl.requireSignin, getContact)
  .put(authCtrl.requireSignin, updateContact)
  .delete(authCtrl.requireSignin, deleteContact);

export default router;
