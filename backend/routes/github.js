const router = require('express').Router();

// GET /api/github/repos?q=
router.get('/repos', (req, res) => {
  res.json({ message: 'TODO' });
});

// GET /api/github/repos/:owner/:repo/branches
router.get('/repos/:owner/:repo/branches', (req, res) => {
  res.json({ message: 'TODO' });
});

// GET /api/github/repos/:owner/:repo/commits?sha=
router.get('/repos/:owner/:repo/commits', (req, res) => {
  res.json({ message: 'TODO' });
});

// POST /api/github/repos/:owner/:repo/commits/:sha/summary
router.post('/repos/:owner/:repo/commits/:sha/summary', (req, res) => {
  res.json({ message: 'TODO' });
});

module.exports = router;
