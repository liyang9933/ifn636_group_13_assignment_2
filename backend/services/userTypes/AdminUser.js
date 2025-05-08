const BaseUser = require('./BaseUser');

class AdminUser extends BaseUser {
  getRole() {
    return 'Admin';
  }
  // Admin can delete any posts in the app.
  canDeleteAnyPost() {
    return true;
  }
  // Admin can delete any replies in the app.
  canDeleteAnyReply() {
    return true;
  }

}

module.exports = AdminUser;
