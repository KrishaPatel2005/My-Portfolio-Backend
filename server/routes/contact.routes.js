import express from "express";
import {
  createContact,
  listContacts,
  getContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/")
  .get(listContacts)
  .post(createContact)
  .delete(deleteAllContacts);

router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default router;