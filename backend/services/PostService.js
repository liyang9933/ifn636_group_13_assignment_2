const Reply = require('../models/Reply');

class PostService {
  async deletePost(post) {
    await Reply.deleteMany({ postId: post._id });
    await post.remove();
    return { message: 'Post and replies deleted' };
  }
}

module.exports = PostService;
