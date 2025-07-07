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
      const result = await pool.query('SELECT * FROM wishlists');
      res.json(result.rows);
    } catch (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database error');
    }
});

// GET /api/wishlists/:id
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const result = await pool.query(`
        SELECT *
        FROM wishlists c
        JOIN items i ON c.iid = i.iid
        WHERE c.id = $1
      `, [userId]);
  
      res.json(result.rows);
    } catch (err) {
      console.error('Error querying user cart:', err);
      res.status(500).send('Database error');
    }
  });
  
router.post('/', async (req, res) => {
    const { id, iid } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO wishlists (id, iid) VALUES ($1, $2) RETURNING id, iid',
            [id, iid]
            );
        res.status(201).json({ message: 'Item created', data: result.rows[0] });
} catch (err) {
    console.error(err);
    res.status(500).send('Server error');
}
});

module.exports = router;