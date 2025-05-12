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
    // console.log('Logged-in user:', user);
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
            <p className="text-[10px] text-gray-500">Created at: {new Date(post.createdAt).toLocaleString()}</p>
            <p className="text-sm text-[#494545] mb-3">{post.author.name}</p>
            <h2 className="text-lg font-bold mb-3">{post.title}</h2>
            
            
            {/* {user && post.author && String(user.id) === (String(post.author._id) || user.role === 'Admin') && (
              <div className="mt-2">
                {String(user.id) === String(post.author._id) && (
                  <button onClick={() => setEditingPost(post)} className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            )} */}
            {/* Admin can use delete button for all users and only author can edit them. */}

            <div className="flex justify-between items-center text-sm">
              <p className="text-sm">{post.content}</p>
              {user && post.author && (
                <div className="mt-2">
                  {String(user.id) === String(post.author._id) && (
                    <button onClick={() => setEditingPost(post)} className="mr-2  text-[#388666] px-4 py-2 px-3 py-1 text-sm hover:underline cursor-pointer">
                      Edit
                    </button>
                      )}
                      {(String(user.id) === String(post.author._id) || user.role === 'Admin') && (
                    <button onClick={() => handleDelete(post._id)} className=" text-[#388666] px-4 py-2 px-3 py-1 text-sm hover:underline cursor-pointer">
                    Delete
                    </button>
                      )}
                </div>
                      )}
            </div>
            <ReplyList postId={post._id} />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
