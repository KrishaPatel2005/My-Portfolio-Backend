// server/models/qualification.model.js
import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Qualification title is required"],
    trim: true,
  },
  institution: {
    type: String,
    required: [true, "Institution name is required"],
    trim: true,
  },
  year: {
    type: String,
    required: [true, "Completion year is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Qualification", qualificationSchema);
