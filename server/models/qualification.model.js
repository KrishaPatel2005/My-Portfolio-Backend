import mongoose from 'mongoose';

// Qualification Schema
const qualificationSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  firstname:   String,
  lastname:    String,
  email:       String,
  completion:  Date,
  description: String
});

// Export model
export default mongoose.model('Qualification', qualificationSchema);
