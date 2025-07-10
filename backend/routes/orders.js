const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM orders');
      res.json(result.rows);
    } catch (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database error');
    }
});

router.post('/', async (req, res) => {
    const { id } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO orders (id) VALUES ($1) RETURNING oid',
            [ id ]
            );
        res.status(201).json({ message: 'Item created', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;