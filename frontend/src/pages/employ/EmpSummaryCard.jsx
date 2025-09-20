import React from "react";
import { useAuth } from "../../context/authContext";


const EmpSummaryCard = ({icon, color}) => {

    const {user} = useAuth();
  return (
    <>
    <div className="rounded flex bg-white shadow-lg">
        <div className={`text-3xl flex justify-center items-center px-4 ${color} text-white`}>
            {icon}
            </div>
            <div className="pl-4 py-2 sm:py-4">
                <p className="text-sm font-semibold">Welcome Back</p>
                <p className="text-sm font-bold">{user.name}</p>
            </div>
    </div>
    </> 
  );
}
export default EmpSummaryCard;