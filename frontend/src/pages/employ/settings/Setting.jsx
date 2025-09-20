import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/authContext";
import { showToastError } from "../../../utils/showToastError";
import MetaData from "../../../components/MetaData";
import axiosInstance from "../../../api/axiosInstance";

const Setting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    //console.log("Form data being sent:", setting); 

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        "/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully!");
        navigate(response.data.updatedUser.role === "admin" ? "/admin-dashboard" : "/employee-dashboard");
      } else {
        toast.error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      showToastError(error); 
    } finally {
      setLoading(false); 
    }
  };

  return (
   <>
   <MetaData title="Change password"/>
    <div className="mt-12 max-w-3xl mx-auto  w-96 sm:w-full bg-white p-2 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
      <form onSubmit={handleSubmit} className="shadow-md shadow-gray-300 border-2 rounded-md p-4">
        <label className="text-xm font-medium text-gray-700">Old Password</label>
        <input
          type="password"
          name="oldPassword"
          onChange={handleChange}
          placeholder="Old Password"
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />

        <label className="text-xm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          name="newPassword"
          onChange={handleChange}
          placeholder="New Password"
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />

        <label className="text-xm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
          } text-white py-2 rounded mt-2 transition`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
   </>
  );
};

export default Setting;
