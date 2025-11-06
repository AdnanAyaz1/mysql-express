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

// | SQL       | Sequelize                        | Example                                                        |
// | --------- | -------------------------------- | -------------------------------------------------------------- |
// | `=`       | `{ [Op.eq]: value }`             | `{ id: { [Op.eq]: 1 } }`                                       |
// | `!=`      | `{ [Op.ne]: value }`             | `{ username: { [Op.ne]: 'adnan' } }`                           |
// | `>`       | `{ [Op.gt]: value }`             | `{ age: { [Op.gt]: 18 } }`                                     |
// | `<`       | `{ [Op.lt]: value }`             | `{ age: { [Op.lt]: 30 } }`                                     |
// | `>=`      | `{ [Op.gte]: value }`            | `{ age: { [Op.gte]: 18 } }`                                    |
// | `<=`      | `{ [Op.lte]: value }`            | `{ age: { [Op.lte]: 50 } }`                                    |
// | `LIKE`    | `{ [Op.like]: '%text%' }`        | `{ title: { [Op.like]: '%Sequelize%' } }`                      |
// | `IN`      | `{ [Op.in]: [values] }`          | `{ id: { [Op.in]: [1,2,3] } }`                                 |
// | `NOT IN`  | `{ [Op.notIn]: [values] }`       | `{ id: { [Op.notIn]: [1,2,3] } }`                              |
// | `OR`      | `{ [Op.or]: [cond1, cond2] }`    | `{ [Op.or]: [{ age: 18 }, { name: 'Ali' }] }`                  |
// | `AND`     | `{ [Op.and]: [cond1, cond2] }`   | `{ [Op.and]: [{ age: { [Op.gt]: 18 } }, { city: 'Lahore' }] }` |
// | `BETWEEN` | `{ [Op.between]: [start, end] }` | `{ price: { [Op.between]: [10, 100] } }`                       |

