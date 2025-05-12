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

    <div className="mb-4 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
      <label className="md:col-span-1 text-gray-600 font-medium text-right">
      Topic Title:
      </label>
      <input
      type="text"
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      className="md:col-span-4 p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="bg-[#53967B33] text-[#494545] px-4 py-2 rounded-md md:col-span-1"
      >
        {editingPost ? 'Update Post' : 'Create Post'}
      </button>
    </div>

    <div className="mb-4 grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
      <label className="md:col-span-1 text-gray-600 font-medium text-right">
        Topic Content:
      </label>
      <textarea
        
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="md:col-span-5 p-2 border rounded w-full"
      ></textarea>
    </div>
    </form>
  );
};

export default PostForm;
