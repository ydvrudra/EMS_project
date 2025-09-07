import React from "react";
import { useAuth } from "../../context/authContext";


const EmpSummaryCard = ({icon, color}) => {

    const {user} = useAuth();
  return (
    <>
    <div className="rounded flex bg-white shadow-lg ">
        <div className={`text-3xl flex justify-center items-center px-4 ${color} text-white`}>
            {icon}
            </div>
            <div className="pl-4 py-1">
                <p className="text-lg font-semibold">Welcome Back</p>
                <p className="text-xl font-bold">{user.name}</p>
            </div>
    </div>
    </> 
  );
}
export default EmpSummaryCard;