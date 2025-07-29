import express from 'express';
import Reservation from '../models/Reservation.js';
import Passenger from '../models/Passenger.js';

const router = express.Router();

// Make reservation
router.post('/book', async (req, res) => {
  try {
    const { flightId, passengerList } = req.body; // [{ firstName, laæstName, email }]

    const pnr = 'PNR' + Math.floor(1000 + Math.random() * 9000);

    const passengerIds = [];

    for (const passenger of passengerList) {
      const existingPassenger = await Passenger.findOne({
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        email: passenger.email
      });

      let savedPassenger = existingPassenger;

      if (!existingPassenger) {
        const newPassenger = new Passenger(passenger);
        savedPassenger = await newPassenger.save();
      } else {
        console.log('Passenger already exists:', existingPassenger._id);
      }

      passengerIds.push(savedPassenger._id);

    }

    const reservation = new Reservation({
      pnr,
      flight: flightId,
      passengers: passengerIds
    });

    await reservation.save();

    res.status(201).json({ message: 'Reservation successful', pnr });
  } catch (err) {
    res.status(500).json({ message: 'Reservation failed', error: err.message });
  }
});

// Find reservation
router.get('/find', async (req, res) => {
  const { pnr, lastName } = req.query;

  try {
    const reservation = await Reservation.findOne({ pnr })
      .populate('flight')
      .populate({
        path: 'passengers',
        match: { lastName: new RegExp(`^${lastName}$`, 'i') },
        select: 'firstName lastName'
      });

    if (!reservation || reservation.passengers.length === 0) {
      return res.status(404).json({ message: 'Reservation not found or last name mismatch' });
    }

    const filteredPassengers = reservation.passengers.filter(p => p.passenger !== null);
    if (filteredPassengers.length === 0) {
      return res.status(404).json({ message: 'No passenger matched with that last name' });
    }

    res.json({ ...reservation.toObject(), passengers: filteredPassengers });
  } catch (err) {
    res.status(500).json({ message: 'Search error', error: err.message });
  }
});

export default router;