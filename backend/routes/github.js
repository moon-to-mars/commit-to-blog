const router = require('express').Router();
const axios = require('axios');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
router.get('/repos/:owner/:repo/commits', async (req, res) => {
  const { owner, repo } = req.params;
  const { sha } = req.query;
  try {
    const response = await githubAxios.get(`/repos/${owner}/${repo}/commits`, {
      params: { sha },
    });
    const commits = response.data.map((item) => ({
      sha: item.sha,
      message: item.commit.message,
      author: item.commit.author.name,
      date: item.commit.author.date,
    }));
    res.json(commits);
  } catch (err) {
    res.status(500).json({ error: '커밋 목록을 불러오지 못했습니다.' });
  }
});

// POST /api/github/repos/:owner/:repo/commits/:sha/summary
router.post('/repos/:owner/:repo/commits/:sha/summary', async (req, res) => {
  const { owner, repo, sha } = req.params;
  try {
    const commitRes = await githubAxios.get(`/repos/${owner}/${repo}/commits/${sha}`);
    const patch = commitRes.data.files
      .map((f) => f.patch || '')
      .join('\n')
      .slice(0, 3000);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `다음은 GitHub 커밋의 코드 변경 내용입니다:\n\n${patch}\n\n아래 형식으로 한국어로 작성해주세요:\n1. 한 줄 요약 (변경의 핵심을 한 문장으로)\n2. 설명 문단 (변경 내용을 자유롭게 설명)`,
        },
      ],
    });

    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: '요약 생성에 실패했습니다. 다시 시도해주세요.' });
  }
});

module.exports = router;
