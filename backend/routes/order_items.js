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
      const result = await pool.query('SELECT * FROM order_items');
      res.json(result.rows);
    } catch (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database error');
    }
});

router.post('/', async (req, res) => {
    const { oid, iid, quantity } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO order_items (oid, iid, quantity) VALUES ($1, $2, $3) RETURNING oid',
            [oid, iid, quantity]
            );
        res.status(201).json({ message: 'Item created', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;