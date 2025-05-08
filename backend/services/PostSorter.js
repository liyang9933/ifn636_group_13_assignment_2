class PostSorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  sort(posts) {
    return this.strategy.sort(posts);
  }
}

module.exports = PostSorter;
