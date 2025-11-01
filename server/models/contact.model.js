import mongoose from 'mongoose';

// Contact Schema
const contactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true }
});

// Export model
export default mongoose.model('Contact', contactSchema);
