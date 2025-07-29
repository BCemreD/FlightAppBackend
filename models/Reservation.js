import mongoose from 'mongoose';

const reservation = new mongoose.Schema({
  pnr: { type: String, required: true, unique: false },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  passengers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Passenger' }
  ]
});

export default mongoose.model('Reservation', reservation);
