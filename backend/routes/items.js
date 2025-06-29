const multer = require('multer');
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
      const result = await pool.query('SELECT * FROM items');
      res.json(result.rows);
    } catch (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database error');
    }
});

router.post('/', async (req, res) => {
    const { id, title, price, description, photo } = req.body;

    try {
        const result = await pool.query(
        'INSERT INTO items (id, title, price, description, photo) VALUES ($1, $2, $3, $4, $5) RETURNING iid, title, price, description, photo',
        [id, title, price, description, photo]
    );
    res.status(201).json({ message: 'Item created', data: result.rows[0] });
} catch (err) {
    console.error(err);
    res.status(500).send('Server error');
}
});

// Save uploaded files to "uploads/" folder
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  },
});

const upload = multer({ storage });

// POST /api/items/upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});


module.exports = router;