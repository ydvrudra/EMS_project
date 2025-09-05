import React from "react";


const AdminSummaryCard = ({icon, text, number, color}) => {
  return (
    <>
    <div className="rounded flex bg-white shadow-lg ">
        <div className={`text-3xl flex justify-center items-center px-4 ${color} text-white`}>
            {icon}
            </div>
            <div className="pl-4 py-1">
                <p className="text-lg font-semibold">{text}</p>
                <p className="text-xl font-bold">{number}</p>
            </div>
    </div>
    </> 
  );
}
export default AdminSummaryCard;