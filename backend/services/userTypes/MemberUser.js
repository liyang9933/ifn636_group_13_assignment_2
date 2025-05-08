const BaseUser = require('./BaseUser');

class MemberUser extends BaseUser {
  getRole() {
    return 'Member';
  }

  canDeleteAnyPost() {
    return false;
  }
}

module.exports = MemberUser;
