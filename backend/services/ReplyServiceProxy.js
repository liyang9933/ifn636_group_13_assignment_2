// const mongoose = require('mongoose');
const UserFactory = require('./UserFactory');
const Reply = require('../models/Reply');

class ReplyServiceProxy {
  constructor(realService) {
    this.realService = realService;
  }

  async deleteReply(replyId, currentUserId) {
    // const reply = await Reply.findById(replyId);
    const reply = await Reply.findById(replyId);
    // console.log('Found reply:', reply); // null
    if (!reply) throw new Error('Reply not found');

    const userDoc = await require('../models/User').findById(currentUserId);
    const user = UserFactory.create(userDoc);

    const isAuthor = reply.author.toString() === currentUserId;
    if (!isAuthor && !user.canDeleteAnyReply()) {
      throw new Error('Not authorized to delete this reply');
    }

    return await this.realService.deleteReply(replyId);
  }
}

module.exports = ReplyServiceProxy;
