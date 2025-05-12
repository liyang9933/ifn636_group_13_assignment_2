import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  // Add role 
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Member' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-[#53967B33] p-6 shadow-md rounded-lg">
        <h1 className="text-[#484444] font-sans mb-4 text-center text-[24px]">Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        {/* Add a role selection */}
        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>
       
        <div className="flex justify-center mx-auto mt-5 ">
        <button type="submit" className="w-1/3 bg-[#53967B] text-white p-2 rounded-md">
          Register
        </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
