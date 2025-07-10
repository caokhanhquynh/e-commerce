// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const cartRoutes = require('./routes/carts');
const wishlistRoutes = require('./routes/wishlists');
const orderRoutes = require('./routes/orders');
const orderItemRoutes = require('./routes/order_items');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json()); 

// Routes
app.use('/api', apiRoutes);
app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'temp')));
app.use('/api/carts', cartRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order_items', orderItemRoutes);

/////////////////////////////////////////

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
