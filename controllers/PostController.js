import { Op } from "sequelize";
import { Post, Tag } from "../models/index.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: "User" });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

    res.status(201).json({ message: "Post created successfully", post });
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

export const filteredPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        title: { [Op.like]: "%Sequelize%" },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// | Operator   | Example                                               | Meaning         |
// | ---------- | ----------------------------------------------------- | --------------- |
// | `[Op.eq]`  | `{ id: { [Op.eq]: 1 } }`                              | equals 1        |
// | `[Op.ne]`  | `{ id: { [Op.ne]: 1 } }`                              | not equals 1    |
// | `[Op.gt]`  | `{ age: { [Op.gt]: 18 } }`                            | greater than 18 |
// | `[Op.gte]` | `{ createdAt: { [Op.gte]: new Date('2024-01-01') } }` | after date      |
// | `[Op.in]`  | `{ id: { [Op.in]: [1, 2, 3] } }`                      | in array        |
// | `[Op.or]`  | `{ [Op.or]: [{ id: 1 }, { id: 2 }] }`                 | OR condition    |
