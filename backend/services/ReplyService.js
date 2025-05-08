const Reply = require('../models/Reply');

class ReplyService {
  async deleteReply(replyId) {
    return await Reply.findByIdAndDelete(replyId);
  }
}

module.exports = ReplyService;
