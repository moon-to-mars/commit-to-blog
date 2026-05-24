const router = require('express').Router();

// GET /api/user
router.get('/', (req, res) => {
  res.json({ message: 'TODO' });
});

module.exports = router;
