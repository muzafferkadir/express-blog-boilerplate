require('dotenv').config();
const express = require('express');

const router = express.Router();
const validator = require('../middlewares/validator');
const verifyToken = require('../middlewares/verifyToken');
const { create, list, update } = require('../validators/post');
const Post = require('../models/post');

// Create a new post
router.post('/', verifyToken, validator(create), async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = new Post({ title, content, tags });
    await post.save();
    res.sendResponse(201, post);
  } catch (error) {
    res.sendError(500, error);
  }
});

// Get all posts
router.get('/', validator(list, 'query'), async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await Post.find().skip((page - 1) * limit).limit(limit);

    const postCount = await Post.countDocuments();
    const totalPages = Math.ceil(postCount / limit);

    res.sendResponse(200, { posts, totalPages, count: postCount });
  } catch (error) {
    res.sendError(500, error);
  }
});

// Get a post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.sendError(404, 'Post not found');
      return;
    }
    res.sendResponse(200, post);
  } catch (error) {
    res.sendError(500, error);
  }
});

// Update a post by id
router.put('/:id', verifyToken, validator(update), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.sendError(404, 'Post not found');
      return;
    }

    const { title, content, tags } = req.body;
    post.set({ title, content, tags });
    await post.save();
    res.sendResponse(200, post);
  } catch (error) {
    res.sendError(500, error);
  }
});

// Delete a post by id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.sendError(404, 'Post not found');
      return;
    }
    await Post.deleteOne({ _id: req.params.id });
    res.sendResponse(201, 'Post deleted successfully');
  } catch (error) {
    res.sendError(500, error);
  }
});
module.exports = router;
