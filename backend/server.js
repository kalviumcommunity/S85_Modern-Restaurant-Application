import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js'; 
import router from './route/routes.js';
import cors from "cors";
import { errorMiddleware } from './error/error.js';
dotenv.config({ path: './config/.env' });
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["POST"],
credentials:true,
}))
connectDB();


app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant App!');
});
app.use(errorMiddleware)
app.use('/api', router);

app.listen(PORT, () => {
  console.log(` Server running on port http://localhost:${PORT}`);
});

export default app 