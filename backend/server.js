import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js'; 
import router from './route/routes.js';

dotenv.config({ path: './config/.env' });
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

connectDB();


app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant App!');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(` Server running on port http://localhost:${PORT}`);
});
