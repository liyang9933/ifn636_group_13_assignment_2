class BaseUser {
  constructor(userDoc) {
    this.userDoc = userDoc;  // MongoDB document
  }

  getRole() {
    return 'BaseUser';
  }

  canDeleteAnyPost() {
    return false;
  }

  getName() {
    return this.userDoc.name;
  }
}

module.exports = BaseUser;
