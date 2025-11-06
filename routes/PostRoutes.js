import express from 'express';

import { createPost, createPostWithTags, getAllPosts, getPostsWithTags } from '../controllers/PostController.js';

const router = express.Router();

// Create Post
router.post('/', createPost);

// Get All Posts with User
router.get('/', getAllPosts);

router.post('/tags', createPostWithTags);
router.get('/tags', getPostsWithTags);

export default router;
