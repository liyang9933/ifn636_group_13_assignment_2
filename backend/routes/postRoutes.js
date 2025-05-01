const express = require('express');
const {
  getPosts,
  addPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const {
  addReply,
  getReplies,
  deleteReply
} = require('../controllers/replyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Post routes
router.get('/', getPosts); // Get all posts
router.post('/', protect, addPost); // Create a post
router.put('/:id', protect, updatePost); // Update a post
router.delete('/:id', protect, deletePost); // Delete a post

// Reply routes
router.get('/:postId/replies', getReplies); // Get all replies for a post
router.post('/:postId/replies', protect, addReply); // Add a reply to a post
router.delete('/replies/:replyId', protect, deleteReply); // Delete a reply

module.exports = router;

