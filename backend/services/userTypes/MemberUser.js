const BaseUser = require('./BaseUser');

class MemberUser extends BaseUser {
  getRole() {
    return 'Member';
  }
  // Members can only delete their own posts.
  canDeleteAnyPost() {
    return false;
  }
  // Members can only delete their own replies.
  canDeleteAnyReply() {
    return false;
  }

}

module.exports = MemberUser;
