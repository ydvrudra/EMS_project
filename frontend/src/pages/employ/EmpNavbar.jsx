import React from "react";
import { useAuth } from "../../context/authContext";
import Loader from "../../components/Loader";

const EMpNavbar = () => {
  const { user, logout ,loading } = useAuth();


  if (loading) return <Loader />; 

  return (
    <div className="flex items-center justify-between mx-auto w-full text-white h-14 bg-teal-600 px-4 shadow-md">
      {/* Left: Profile + Name */}
      <div className="flex items-center space-x-3">
        {/* Profile Image */}
        {user?.profileImage && (
          <img
            src={`/${user.profileImage}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
        )}
        {/* User Name */}
        <p className="text-md font-medium">
          Welcome, <span className="font-semibold">{user?.name}</span>
        </p>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={logout}
        className="bg-white text-teal-700 px-3 py-1 rounded hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default EMpNavbar;
