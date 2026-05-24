const router = require('express').Router();
const Post = require('../models/Post');

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: '불러오지 못했습니다. 다시 시도해주세요.' });
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: '포스트를 찾을 수 없습니다.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: '불러오지 못했습니다. 다시 시도해주세요.' });
  }
});

// POST /api/posts
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: '저장에 실패했습니다.' });
  }
});

// PATCH /api/posts/:id
router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: '포스트를 찾을 수 없습니다.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: '저장에 실패했습니다.' });
  }
});

module.exports = router;
