const router = require('express').Router();
const axios = require('axios');

const githubAxios = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
});

// GET /api/github/repos?q=
router.get('/repos', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    const response = await githubAxios.get('/search/repositories', {
      params: { q },
    });
    const repos = response.data.items.map(({ name, full_name }) => ({ name, full_name }));
    res.json(repos);
  } catch (err) {
    res.status(500).json({ error: '저장소 검색에 실패했습니다.' });
  }
});

// GET /api/github/repos/:owner/:repo/branches
router.get('/repos/:owner/:repo/branches', async (req, res) => {
  const { owner, repo } = req.params;
  try {
    const response = await githubAxios.get(`/repos/${owner}/${repo}/branches`);
    const branches = response.data.map(({ name }) => ({ name }));
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: '브랜치 목록을 불러오지 못했습니다.' });
  }
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
