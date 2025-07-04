// backend/routes/api.js
const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

module.exports = router;
