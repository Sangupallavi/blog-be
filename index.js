import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import blogRoutes from './Routes/blogRoutes.js';
import userRoutes from './Routes/userRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
