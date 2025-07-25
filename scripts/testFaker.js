import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Flight from './models/Flight.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

const flight = {
  from: faker.location.city(),
  to: faker.location.city(),
  departureTime: faker.date.future(),
  price: faker.commerce.price({ min: 50, max: 800, dec: 2 }),
  status: faker.helpers.arrayElement(['scheduled', 'delayed', 'cancelled']),
  flightNumber: faker.string.alphanumeric({ length: 6, casing: 'upper' })
};

//Add into db
await Flight.insertMany(flights);
console.log("Fake flights added");

// Close conn.
await mongoose.disconnect();
