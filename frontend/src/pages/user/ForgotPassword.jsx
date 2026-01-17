import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/users/forgot-password', { email });
      if (response.data.success) {
        toast.success('Password reset link sent to your email');
      }
    } catch (error) {
      toast.error('Error sending reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative bg-white px-4">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-teal-600 z-0" />
      <div className="z-10 w-full max-w-sm">
        <div className="bg-white p-6 sm:p-8 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"} text-white py-2 rounded`}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            <Link to="/login" className="text-teal-600 hover:underline">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
