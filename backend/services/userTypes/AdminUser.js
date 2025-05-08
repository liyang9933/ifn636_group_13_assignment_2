const BaseUser = require('./BaseUser');

class AdminUser extends BaseUser {
  getRole() {
    return 'Admin';
  }

  canDeleteAnyPost() {
    return true;
  }
}

module.exports = AdminUser;
