const Reply = require('../models/Reply');
const Post = require('../models/Post')
const ReplyService = require('../services/ReplyService');
const ReplyServiceProxy = require('../services/ReplyServiceProxy');

// Add Reply
const addReply = async (req, res) => {
  const { content } = req.body;
  try {
    const reply = await Reply.create({ postId: req.params.postId, author: req.user.id, content });
    // reply = await reply.populate('author', 'name _id');
    const populatedReply = await Reply.findById(reply._id).populate('author', 'name _id');
    await Post.findByIdAndUpdate(req.params.postId, { $push: { replies: reply._id } });
    res.status(201).json(populatedReply);
  } catch (error) {
    // console.error('Error submitting reply:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get Replies
const getReplies = async (req, res) => {
  try {
    const replies = await Reply.find({ postId: req.params.postId }).populate('author', 'name _id');
    // console.log('Fetched replies:', replies);
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Reply in proxy design pattern
/* const deleteReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.replyId);
    if (!reply) return res.status(404).json({ message: 'Reply not found' });
    if (reply.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });
    // console.log(req.params.replyId, req.user.id)
    await reply.remove();
    await Post.findByIdAndUpdate(reply.postId, { $pull: { replies: reply._id } });
    res.json({ message: 'Reply deleted' });
  } catch (error) {
    // console.error('Error deleting reply:', error);
    res.status(500).json({ message: error.message });
  }
}; */
const deleteReply = async (req, res) => {
  try {
    const proxy = new ReplyServiceProxy(new ReplyService());
    const result = await proxy.deleteReply(req.params.replyId, req.user.id);

    if (!result) return res.status(404).json({ message: 'Reply not found or already deleted' });
    res.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = { addReply, getReplies, deleteReply };