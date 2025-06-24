// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['https://frontend-production-a899.up.railway.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json()); 

// Routes
app.use('/api', apiRoutes);
app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);

/////////////////////////////////////////

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
