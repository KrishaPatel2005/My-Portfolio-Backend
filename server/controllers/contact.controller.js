// server/controllers/contact.controller.js
import Contact from "../models/contact.model.js";

// ➕ CREATE — Public (for contact form submissions)
export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact created successfully!", contact });
  } catch (err) {
    console.error("❌ Error creating contact:", err);
    res.status(400).json({ error: err.message });
  }
};

// 📜 READ ALL — Admin only
export const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ created: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to load contacts" });
  }
};

// 🔍 READ ONE — Admin only
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: "Invalid contact ID" });
  }
};

// ✏️ UPDATE — Admin only
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact updated successfully", contact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🗑 DELETE ONE — Admin only
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete contact" });
  }
};

// 🧹 DELETE ALL — Admin only
export const deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} contacts` });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete all contacts" });
  }
};
