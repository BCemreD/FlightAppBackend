import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  pnr: {
    type: String,
    required: true,
    unique: true
  },
  airline: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  depaartureTime: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'delayed', 'cancelled'],
    default: 'scheduled'
  },
});

const Flight = mongoose.model('Flight', flightSchema);
export default Flight;
