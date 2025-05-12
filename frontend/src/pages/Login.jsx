import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/posts');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 ">
      
      <form onSubmit={handleSubmit} className="bg-[#53967B33] p-6 shadow-md rounded-lg h-[300px] ">
        <h1 className="text-[#484444] font-sans mb-4 text-center text-[24px]">Login</h1>
        
        <div className="flex justify-center mx-auto mt-7">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-3/4 mb-4 p-2 border rounded"
        />
        </div>

        <div className="flex justify-center mx-auto mt-2">
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-3/4 mb-4 p-2 border rounded"
        />
        </div>

        <div className="flex justify-center mx-auto mt-5 ">
        <button type="submit" className="w-1/3 bg-[#53967B] text-white p-2 rounded-md">
          Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
