// server/controllers/qualification.controller.js
import Qualification from "../models/qualification.model.js";

// ➕ CREATE — Admin only
export const createQualification = async (req, res) => {
  try {
    const qualification = new Qualification(req.body);
    await qualification.save();
    res.status(201).json({
      message: "Qualification added successfully!",
      qualification,
    });
  } catch (err) {
    console.error("❌ Qualification create error:", err);
    res.status(400).json({ error: err.message });
  }
};

// 📜 READ ALL — Public
export const listQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ created: -1 });
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to load qualifications" });
  }
};

// 🔍 READ ONE — Public
export const getQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification)
      return res.status(404).json({ error: "Qualification not found" });
    res.json(qualification);
  } catch (err) {
    res.status(400).json({ error: "Invalid qualification ID" });
  }
};

// ✏️ UPDATE — Admin only
export const updateQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!qualification)
      return res.status(404).json({ error: "Qualification not found" });
    res.json({
      message: "Qualification updated successfully",
      qualification,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🗑 DELETE ONE — Admin only
export const deleteQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);
    if (!qualification)
      return res.status(404).json({ error: "Qualification not found" });
    res.json({ message: "Qualification deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete qualification" });
  }
};

// 🧹 DELETE ALL — Admin only
export const deleteAllQualifications = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} qualifications` });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete all qualifications" });
  }
};
