// backend/routes/api.js
const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

////////////////////////////////////////////////////////////////////////

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const result = await pool.query('SELECT * FROM sellers WHERE email = $1', [email]);
      if (result.rows.length === 0) return res.status(400).json({ msg: 'User not found' });

      const sellers = result.rows[0];
      const match = await bcrypt.compare(password, sellers.password);
      // const match = (password == sellers.password)
      if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

      const token = jwt.sign({ id: sellers.id, email: sellers.email }, JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
  
      res.json({ success: true });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});


router.get('/sellers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sellers');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Database error');
  }
});

module.exports = router;
