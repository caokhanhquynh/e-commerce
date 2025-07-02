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
      const result = await pool.query('SELECT * FROM carts');
      res.json(result.rows);
    } catch (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database error');
    }
});

router.post('/', async (req, res) => {
    const { id, iid } = req.body;

    try {
        const existing = await pool.query(
            'SELECT quantity FROM carts WHERE id = $1 AND iid = $2',
            [id, iid]
        );
        if (existing.rowCount > 0) {
            const updated = await pool.query(
              'UPDATE carts SET quantity = quantity + 1 WHERE id = $1 AND iid = $2 RETURNING id, iid, quantity',
              [id, iid]
            );
            return res.status(200).json({ message: 'Item quantity updated', data: updated.rows[0] });
        }

        const result = await pool.query(
            'INSERT INTO carts (id, iid, quantity) VALUES ($1, $2, 1) RETURNING id, iid',
            [id, iid]
            );
        res.status(201).json({ message: 'Item created', data: result.rows[0] });
} catch (err) {
    console.error(err);
    res.status(500).send('Server error');
}
});

module.exports = router;