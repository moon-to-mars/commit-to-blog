require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const githubRouter = require('./routes/github');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/github', githubRouter);
app.use('/api/posts', postsRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.json({ message: 'server is running' });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
