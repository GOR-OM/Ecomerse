import express  from 'express';
import mongoose from 'mongoose';
import { config } from "dotenv";
import productRoutes from './routes/productRoute.js';

const app = express();




config({
    path: "./backend/config/config.env"
});


// import json and  other things after that import routes
app.use(express.json());


//import routes : 
app.use('/api/products',productRoutes);






export default app;