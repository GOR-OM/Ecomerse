import express  from 'express';
import mongoose from 'mongoose';
import { config } from "dotenv";
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';
import errorMiddleware from './middleware/error.js';
const app = express();




config({
    path: "./backend/config/config.env"
});


// import json and  other things after that import routes
app.use(express.json());
app.use(errorMiddleware);

//import routes : 
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);







export default app;