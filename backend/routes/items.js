const multer = require('multer');
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

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

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const upload = multer({ dest: 'temp/' });
// POST /api/items/upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try{
    if (!req.file) return res.status(400).send('No file uploaded.');
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

router.get('/:iid', async (req, res) => {
  const { iid } = req.params;
  try {
    const result = await pool.query('SELECT * FROM items WHERE iid = $1', [iid]);
    if (result.rowCount === 0) return res.status(404).send('Item not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;