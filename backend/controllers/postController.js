const Post = require('../models/Post');
const Reply = require('../models/Reply');

// Get Posts (Read)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name _id').populate('replies'); // Populate author and replies
    // console.log('Fetched posts:', posts);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Post (Create)
const addPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    console.log('User ID:', req.user.id);
    let post = await Post.create({ author: req.user.id, title, content });
    post = await post.populate('author', 'name _id');
    res.status(201).json(post);
  } catch (error) {
    // console.error('Error creating post:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update Post
const updatePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    post.title = title || post.title;
    post.content = content || post.content;
    post.updatedAt = Date.now();

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await Reply.deleteMany({ postId: post._id }); // Delete associated replies
    await post.remove();
    res.json({ message: 'Post and replies deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, addPost, updatePost, deletePost };
