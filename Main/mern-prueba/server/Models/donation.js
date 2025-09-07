import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  productInfo: { type: String, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['disponible', 'reservada', 'entregada'], default: 'disponible' },
  location: { type: String },
  expiresAt: { type: Date }
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);
