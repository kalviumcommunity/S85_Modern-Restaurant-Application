// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './database/db.js'; 
// import router from './route/routes.js';
// import cors from "cors";
// import { errorMiddleware } from './error/error.js';
// import foodRoutes from "./route/foodRoutes.js";
// dotenv.config({ path: './config/.env' });
// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
// app.use(cors({
//   origin:[process.env.FRONTEND_URL],
//   methods:["GET", "POST", "PUT", "DELETE"],
// credentials:true,
// }))
// connectDB();


// app.get('/', (req, res) => {
//   res.send('Welcome to the Restaurant App!');
// });
// app.use(errorMiddleware)
// app.use('/api', router);
// app.use('/api/foods', foodRoutes);
// app.listen(PORT, () => {
//   console.log(` Server running on port http://localhost:${PORT}`);
// });

// export default app 

import express from 'express';
import dotenv from 'dotenv';
import sequelize from './database/database.js';  
import router from './route/sqlroutes.js';
import foodRoutes from "./route/sqlfoodRoutes.js";
import cors from "cors";
import { errorMiddleware } from './error/error.js';

dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant App!');
});
app.use('/api', router);
app.use('/api/foods', foodRoutes);
app.use(errorMiddleware);

// ✅ Sequelize DB Connect & Sync
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected successfully.');
    return sequelize.sync({ alter: true }); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Unable to connect to the database:', error);
  });

export default app;
