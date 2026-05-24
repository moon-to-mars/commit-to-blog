const router = require('express').Router();

// GET /api/posts
router.get('/', (req, res) => {
  res.json({ message: 'TODO' });
});

// GET /api/posts/:id
router.get('/:id', (req, res) => {
  res.json({ message: 'TODO' });
});

// POST /api/posts
router.post('/', (req, res) => {
  res.json({ message: 'TODO' });
});

// PATCH /api/posts/:id
router.patch('/:id', (req, res) => {
  res.json({ message: 'TODO' });
});

module.exports = router;
