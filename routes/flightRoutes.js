import express from 'express';
import Flight from '../models/Flight.js';

const router = express.Router();

// Dropdown locations
router.get('/locations', async (req, res) => {
  try {
    const flights = await Flight.find({}, 'from to'); // get id
    const uniqueLocations = new Set();

    flights.forEach(flight => {
      uniqueLocations.add(flight.from);
      uniqueLocations.add(flight.to);
    });

    res.json(Array.from(uniqueLocations));
  } catch (err) {
    res.status(500).json({ message: 'Locations not loaded', error: err.message });
  }
});

// Search endpoint
router.get('/search', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Flights not loaded', error: err.message });
  }
});

// Search all endpoint
router.get('/all', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Flights not loaded', error: err.message });
  }
});

// Single flight by ID
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching flight', error: err.message });
  }
});

export default router;
