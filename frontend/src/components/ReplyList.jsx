import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import ReplyForm from './ReplyForm';

const ReplyList = ({ postId }) => {
  const { user } = useAuth();
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts/${postId}/replies`);
        setReplies(response.data);
      } catch (error) {
        console.error('Failed to fetch replies', error);
      }
    };
    fetchReplies();
  }, [postId]);

  const handleDelete = async (replyId) => {
    try {
      await axiosInstance.delete(`/api/posts/replies/${replyId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReplies(replies.filter((reply) => reply._id !== replyId));
    } catch (error) {
      // console.log(replyId)

      alert('Failed to delete reply.');
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <ReplyForm postId={postId} replies={replies} setReplies={setReplies} />
      {replies.map((reply) => (
        <div key={reply._id} className="bg-gray-200 p-2 mb-2 rounded">
          <p>{reply.content}</p>
          <p className="text-sm text-gray-500">By: {reply.author.name}</p>
          <p className="text-sm text-gray-500">Reply at: {new Date(reply.createdAt).toLocaleString()}</p>
          {user && reply.author && String(user.id) === String(reply.author._id) && (
            <button onClick={() => handleDelete(reply._id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReplyList;
