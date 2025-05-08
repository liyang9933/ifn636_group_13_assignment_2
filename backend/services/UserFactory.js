const AdminUser = require('./userTypes/AdminUser');
const MemberUser = require('./userTypes/MemberUser');

class UserFactory {
  static create(userDoc) {
    if (userDoc.role === 'Admin') {
      return new AdminUser(userDoc);
    } else {
      return new MemberUser(userDoc);
    }
  }
}

module.exports = UserFactory;
