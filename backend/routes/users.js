const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//////////////////////////////////Buyers/////////////////////////////////////
router.get('/buyers', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM buyers');
      res.json(result.rows);
    } catch (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database error');
    }
});
router.post('/buyers', async (req, res) => {
  const buyerData = req.body;
  res.status(201).json({ message: 'Buyer created', data: buyerData });
});

//////////////////////////////////Sellers/////////////////////////////////////
router.get('/sellers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sellers');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Database error');
  }
});

//////////////////////////////////Deliverers/////////////////////////////////////
router.get('/deliverers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM deliverers');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Database error');
  }
});

module.exports = router;