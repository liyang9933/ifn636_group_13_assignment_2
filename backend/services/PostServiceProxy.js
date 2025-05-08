const Post = require('../models/Post');
const Reply = require('../models/Reply');
const UserFactory = require('./UserFactory');
const User = require('../models/User');

class PostServiceProxy {
  constructor(realService) {
    this.realService = realService;
  }

  async deletePost(postId, userId) {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    const userDoc = await User.findById(userId);
    const user = UserFactory.create(userDoc);

    const isAuthor = post.author.toString() === userId;
    const isAdmin = user.canDeleteAnyPost();

    if (!isAuthor && !isAdmin) {
      const err = new Error('Not authorized to delete this post');
      err.statusCode = 403;
      throw err;
    }

    return this.realService.deletePost(post);
  }
}

module.exports = PostServiceProxy;
