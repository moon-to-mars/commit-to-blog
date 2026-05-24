const router = require('express').Router();
const githubAxios = require('../lib/github');

// GET /api/user
router.get('/', async (req, res) => {
  try {
    const response = await githubAxios.get('/user');
    const { login, avatar_url } = response.data;
    res.json({ login, avatar_url });
  } catch (err) {
    res.status(500).json({ error: 'GitHub 연동에 문제가 있습니다.' });
  }
});

module.exports = router;
