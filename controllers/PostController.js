import {Post, Tag} from "../models/index.js";

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

export const createPostWithTags = async (req, res) => {
  try {
    const { title, content, tags } = req.body; // tags = ["tech", "react", "mysql"]

    // 1️⃣ Create the post
    const post = await Post.create({ title, content });

    // 2️⃣ Find or create tags
    const tagInstances = await Promise.all(
      tags.map(async (tagName) => {
        const [tag] = await Tag.findOrCreate({ where: { name: tagName } });
        return tag;
      })
    );

    // 3️⃣ Associate tags with post
    await post.addTags(tagInstances);

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsWithTags = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: Tag });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};