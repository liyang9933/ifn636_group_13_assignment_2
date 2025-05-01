import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import PostForm from './PostForm';
import ReplyList from './ReplyList';

const PostList = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      alert('Failed to delete post.');
    }
  };

  return (
    <div>
      <PostForm posts={posts} setPosts={setPosts} editingPost={editingPost} setEditingPost={setEditingPost} />
      {posts.map((post) => {
        // console.log('User Object:', user);

        return (
          <div key={post._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">By: {post.author.name}</p>
            <p className="text-sm text-gray-500">Created at: {new Date(post.createdAt).toLocaleString()}</p>
            {user && post.author && String(user.id) === String(post.author._id) && (
              <div className="mt-2">
                <button onClick={() => setEditingPost(post)} className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            )}
            <ReplyList postId={post._id} />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
