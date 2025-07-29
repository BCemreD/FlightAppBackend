import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import flightRoutes from './routes/flightRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // JSON body 
app.use('/flights', flightRoutes);
app.use('/reservations', reservationRoutes);

// Main test route
app.get('/', (req, res) => {
  res.send('Flight API working 🚀');
});

// Mongo connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`✅ Server is working on ${PORT}`);
});
}).catch((err) => {
  console.error('❌ MongoDB not connected:', err.message);
});


