import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const PostForm = ({ posts, setPosts, editingPost, setEditingPost }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    if (editingPost) {
      setFormData({ title: editingPost.title, content: editingPost.content });
    } else {
      setFormData({ title: '', content: '' });
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        const response = await axiosInstance.put(`/api/posts/${editingPost._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // setPosts(posts.map((post) => (post._id === response.data._id ? response.data : post)));
        setPosts((prevPosts) => {
          const updated = prevPosts.map((post) =>
            post._id === response.data._id ? response.data : post
          );
          return updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        });
      } else {
        const response = await axiosInstance.post('/api/posts', { ...formData, author: user._id }, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // setPosts([...posts, response.data]);
        // Posts sorting by date.
        setPosts((prevPosts) => {
          const updated = [...prevPosts, response.data];
          return updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        })
      }
      setEditingPost(null);
      setFormData({ title: '', content: '' });
    } catch (error) {
      console.log(error.response);

      alert('Failed to save post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingPost ? 'Edit Post' : 'Create Post'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      ></textarea>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingPost ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;
