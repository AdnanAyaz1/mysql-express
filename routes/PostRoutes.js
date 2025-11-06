import express from 'express';

import { createPost, getAllPosts } from '../controllers/PostController.js';

const router = express.Router();

// Create Post
router.post('/', createPost);

// Get All Posts with User
router.get('/', getAllPosts);

export default router;
