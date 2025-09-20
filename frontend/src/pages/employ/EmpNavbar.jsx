import React from "react";
import { useAuth } from "../../context/authContext";
import Loader from "../../components/Loader";

const EMpNavbar = () => {
  const { user, logout ,loading } = useAuth();


  if (loading) return <Loader />; 

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between mx-auto w-full text-white h-12  bg-teal-600 px-2">
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
        <p className="text-sm capitalize ml-6">
          Welcome, <span className="font-great text-xl">{user?.name}</span>
        </p>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={logout}
        className="bg-gray-700 text-sm px-2 py-1.5 rounded font-normal hover:bg-teal-800 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default EMpNavbar;
