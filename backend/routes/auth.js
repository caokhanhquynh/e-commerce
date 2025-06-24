const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Register
router.post('/register', [
    body('name'),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
        'INSERT INTO sellers (name, email, password) VALUES ($1, $2, $3) RETURNING sid, email',
        [name, email, hash]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Login
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
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
