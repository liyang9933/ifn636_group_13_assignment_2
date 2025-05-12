import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ReplyForm = ({ postId, replies, setReplies }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/api/posts/${postId}/replies`,
        { content },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setReplies([...replies, response.data]);
      setContent('');
    } catch (error) {
      alert('Failed to submit reply.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 items-start">
      <textarea
        placeholder="Write a reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
      ></textarea>
      
      <button type="submit" 
      className="bg-[#53967B33] text-sm text-[#494545] px-4 py-5 rounded hover:underline">
        Reply
      </button>
    </form>
  );
};

export default ReplyForm;
