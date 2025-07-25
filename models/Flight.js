import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  departureTime: Date,
  price: Number,
  availableSeats: Number,
  status: { type: String, enum: ['active', 'cancelled', 'delayed'], default: 'active' }
});

export default mongoose.model('Flight', flightSchema);
