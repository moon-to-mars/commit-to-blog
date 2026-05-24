const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    date: String,
    branch: String,
    summary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
