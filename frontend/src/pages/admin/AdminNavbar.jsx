import React from "react";
import { useAuth } from "../../context/authContext";


const AdminNavbar = () => {

    const {user, logout} = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between mx-auto w-full text-white h-12  bg-teal-600 px-2 ">
        <p className="text-sm capitalize ml-6">Welcome, <span className="font-great text-xl">{user.name}</span></p>
        <button
        onClick={logout}
        className="bg-gray-700 text-sm px-2 py-1.5 rounded font-normal hover:bg-teal-800">Logout
        </button>
    </div>
  );
}   
export default AdminNavbar;