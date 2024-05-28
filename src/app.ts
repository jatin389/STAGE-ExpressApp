import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import myListRoutes from './routes/myListRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', myListRoutes);
app.use('/api', userRoutes);

mongoose.connect(process.env.MONGODB_URI as string, {}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB', error);
});

export default app;
