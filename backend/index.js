import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes and middleware
import AuthRoute from './routes/AuthRoute.js';
import TenantRoute from './routes/TenantRoute.js';
import LandlordRoute from './routes/LandlordRoute.js';
import PropertyRoute from './routes/PropertyRoute.js';
import { GlobalErrorHandler } from './middlewares/GlobalErrorHandler.js';
import { ErrorHandler } from './middlewares/ErrorHandler.js';

// Load Environmental Variables
dotenv.config();

// Environmental Variables
const PORT = process.env.PORT || 8000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

// Connect to MongoDB
mongoose.connect(MONGODB_CONNECTION_STRING)
.then(() => {
    console.log('Database connected');
})
.catch((err) => {
    console.error('Database connection error:', err.message);
});

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'App-Key'],
    credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/ghar/auth', AuthRoute);
app.use('/ghar/tenant', TenantRoute);
app.use('/ghar/landlord', LandlordRoute);
app.use('/ghar/property',PropertyRoute);

// Undefined Routes
app.use('*', (req, res, next) => {
    return next(ErrorHandler(400, 'Undefined Route'));
});

// Global Error Handler Middleware
app.use(GlobalErrorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
