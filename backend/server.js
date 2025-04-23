import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js'; 
import router from './route/routes.js';
import foodRoutes from "./route/foodRoutes.js";
import cors from "cors";
import cookieParser from 'cookie-parser'; // Import cookie-parser
import { errorMiddleware } from './error/error.js';

dotenv.config({ path: './config/.env' });
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use(cors({
  origin: [process.env.FRONTEND_URL], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));

connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant App!');
});

// Main Routes
app.use('/api', router); 
app.use('/api/foods', foodRoutes); 

app.use(errorMiddleware); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
