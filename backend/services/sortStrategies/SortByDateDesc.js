const SortStrategy = require('./SortStrategy');

class SortByDateDesc extends SortStrategy {
  sort(posts) {
    return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

module.exports = SortByDateDesc;
