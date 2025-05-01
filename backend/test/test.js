const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;


const Post = require('../models/Post');
const Reply = require('../models/Reply');
const {
  getPosts,
  addPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const {
  addReply,
  getReplies,
  deleteReply,
} = require('../controllers/replyController');

chai.use(require('chai-http'));

// ---------- Post Controller Tests ----------
describe('Post Controller Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all posts', async () => {
    const mockPosts = [{ title: 'Test Post' }];
    const findStub = sinon.stub(Post, 'find').returns({
      populate: sinon.stub().returns({
        populate: sinon.stub().resolves(mockPosts),
      }),
    });

    const req = {};
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };

    await getPosts(req, res);
    expect(res.json.calledWith(mockPosts)).to.be.true;
  });

  it('should add a new post', async () => {
    const userId = new mongoose.Types.ObjectId();
    const req = {
      user: { id: userId },
      body: { title: 'New Post', content: 'Content' },
    };

    const createdPost = {
      ...req.body,
      author: userId,
      populate: sinon.stub().resolvesThis(),
    };

    const createStub = sinon.stub(Post, 'create').resolves(createdPost);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await addPost(req, res);
    expect(createStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdPost)).to.be.true;
  });

  it('should update a post', async () => {
    const userId = new mongoose.Types.ObjectId();
    const postId = new mongoose.Types.ObjectId();
    const req = {
      user: { id: userId.toString() },
      params: { id: postId },
      body: { title: 'Updated Title', content: 'Updated Content' },
    };

    const post = {
      _id: postId,
      author: userId,
      title: 'Old Title',
      content: 'Old Content',
      save: sinon.stub().resolvesThis(),
    };

    sinon.stub(Post, 'findById').resolves(post);

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };

    await updatePost(req, res);
    expect(post.title).to.equal('Updated Title');
    expect(res.json.calledOnceWith(post)).to.be.true;
  });

  it('should delete post and its replies', async () => {
    const userId = new mongoose.Types.ObjectId();
    const postId = new mongoose.Types.ObjectId();

    const post = {
      _id: postId,
      author: userId,
      remove: sinon.stub().resolves(),
    };

    sinon.stub(Post, 'findById').resolves(post);
    const deleteManyStub = sinon.stub(Reply, 'deleteMany').resolves();

    const req = {
      user: { id: userId.toString() },
      params: { id: postId },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await deletePost(req, res);

    expect(deleteManyStub.calledOnce).to.be.true;
    expect(post.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Post and replies deleted' })).to.be.true;
  });
});

// ---------- Reply Controller Tests ----------
describe('Reply Controller Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should add a reply to a post', async () => {
    const userId = new mongoose.Types.ObjectId();
    const postId = new mongoose.Types.ObjectId();
    const req = {
      user: { id: userId },
      params: { postId: postId.toString() },
      body: { content: 'Reply content' },
    };

    const reply = {
      _id: new mongoose.Types.ObjectId(),
      postId,
      author: userId,
      content: req.body.content,
    };

    sinon.stub(Reply, 'create').resolves(reply);
    const populateStub = sinon.stub(Reply, 'findById').resolves({
      ...reply,
      author: { name: 'User Name', _id: userId },
    });

    const updateStub = sinon.stub(Post, 'findByIdAndUpdate').resolves();

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await addReply(req, res);

    expect(populateStub.calledOnce).to.be.true;
    expect(res.json.called).to.be.true;
  });

  it('should get replies for a post', async () => {
    const replies = [{ content: 'Reply 1' }];
    const findStub = sinon.stub(Reply, 'find').returns({
      populate: sinon.stub().resolves(replies),
    });

    const req = { params: { postId: new mongoose.Types.ObjectId() } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };

    await getReplies(req, res);
    expect(res.json.calledWith(replies)).to.be.true;
  });

  it('should delete a reply', async () => {
    const userId = new mongoose.Types.ObjectId();
    const replyId = new mongoose.Types.ObjectId();
    const req = {
      user: { id: userId.toString() },
      params: { replyId },
    };

    const reply = {
      _id: replyId,
      author: userId,
      postId: new mongoose.Types.ObjectId(),
      remove: sinon.stub().resolves(),
    };

    sinon.stub(Reply, 'findById').resolves(reply);
    const updateStub = sinon.stub(Post, 'findByIdAndUpdate').resolves();

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };

    await deleteReply(req, res);
    expect(reply.remove.calledOnce).to.be.true;
    expect(updateStub.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Reply deleted' })).to.be.true;
  });
});
