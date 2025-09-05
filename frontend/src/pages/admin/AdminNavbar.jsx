import React from "react";
import { useAuth } from "../../context/authContext";


const AdminNavbar = () => {

    const {user} = useAuth();

  return (
    <div className="flex items-center justify-between text-white h-12  bg-teal-600 px-4">
        <p className="">Welcome, {user.name}</p>
        <button className="bg-gray-700 px-3 py-1 rounded font-normal hover:bg-teal-800">Logout</button>
    </div>
  );
}   
export default AdminNavbar;