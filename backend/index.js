import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/user.js';
import bodyParser from 'body-parser';
import wishlistRouter from './routes/wishlist.js';
import productRouter from './routes/product.js';
import connectCloudinary from './config/cloudinary.js';
dotenv.config({});
const app = express(); 

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000;
app.use('/api/v1/user', userRoute);
app.use('/api/v1/wishlist', wishlistRouter);
app.use('/api/v1/product', productRouter);

app.listen(PORT, ()=> { 
    connectDB();
    connectCloudinary();
    console.log(`Server listens at port ${PORT}`); 
});