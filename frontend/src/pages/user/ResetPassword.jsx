import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/users/reset-password', { token, newPassword });
      if (response.data.success) {
        toast.success('Password reset successfully');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative bg-white px-4">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-teal-600 z-0" />
      <div className="z-10 w-full max-w-sm">
        <div className="bg-white p-6 sm:p-8 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"} text-white py-2 rounded`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
