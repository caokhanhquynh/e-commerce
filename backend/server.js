// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON in requests

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
