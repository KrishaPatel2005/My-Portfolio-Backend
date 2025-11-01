import mongoose from 'mongoose';

// Project Schema
const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  firstname:   String,
  lastname:    String,
  email:       String,
  completion:  Date,
  description: String
});

// Export model
export default mongoose.model('Project', projectSchema);
