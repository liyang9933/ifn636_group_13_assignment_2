import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
// import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { useAuth } from '../context/AuthContext';

const Posts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // console.log('Fetched posts:', response.data);
        setPosts(response.data);
      } catch (error) {
        alert('Failed to fetch posts.');
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div className="container mx-auto p-6">

      <PostList posts={posts} setPosts={setPosts} setEditingPost={setEditingPost} />
    </div>
  );
};

export default Posts;
