import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import Flight from '../models/Flight.js'; // Flight model dosyanın doğru yolu

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected for seeding'))
  .catch((err) => console.error('❌ MongoDB error', err));

const seedFlights = async () => {
  try {
    await Flight.deleteMany();

    const flightList = [];

    for (let i = 0; i < 20; i++) {
      flightList.push({
        from: faker.location.city(),
        to: faker.location.city(),
        departureTime: faker.date.soon({ days: 30 }),
        price: faker.commerce.price({ min: 49, max: 299, dec: 2 }),
        airline: faker.company.name(),
        flightNumber: faker.string.alphanumeric({ length: 6, casing: 'upper' }),
        durationMinutes: faker.number.int({ min: 45, max: 300 })
      });
    }

    await Flight.insertMany(flightList);
    console.log('✅ 20 sahte uçuş başarıyla yüklendi');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Hata:', err);
    mongoose.connection.close();
  }
};

seedFlights();
