import cors from 'cors';

const corsOptions = {
  origin: 'https://flight-app-self-eight.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

export default cors(corsOptions);