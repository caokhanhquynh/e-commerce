const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

router.get('/stats', async (req, res) => {
  try {
    const [users, items, orders, revenue] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM users'),
      pool.query('SELECT COUNT(*) FROM items'),
      pool.query('SELECT COUNT(*) FROM orders'),
      pool.query(`
        SELECT COALESCE(SUM(oi.quantity * i.price), 0) AS revenue
        FROM order_items oi
        JOIN items i ON oi.iid = i.iid
      `)
    ]);

    const stats = {
      totalUsers: parseInt(users.rows[0].count),
      totalItems: parseInt(items.rows[0].count),
      totalOrders: parseInt(orders.rows[0].count),
      revenue: parseFloat(revenue.rows[0].revenue)
    };

    res.json(stats);
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
