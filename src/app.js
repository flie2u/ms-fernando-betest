const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/AuthRoutes');
const connectDB = require('./config/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Routes
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

module.exports = app;
