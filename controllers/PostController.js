import Post from "../models/Post.js";

export const createPost =  async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getAllPosts =  async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'User' });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}