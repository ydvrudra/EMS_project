import React from "react";


const AdminSummaryCard = ({icon, text, number, color}) => {
  return (
    <>
    <div className="rounded flex bg-white shadow-lg ">
        <div className={`text-2xl flex justify-center items-center px-4 ${color} text-white`}>
            {icon}
            </div>
            <div className="pl-4 py-2 sm:py-4">
                <p className="text-sm  font-semibold">{text}</p>
                <p className="text-sm  font-bold">{number}</p>
            </div>
    </div>
    </> 
  );
}
export default AdminSummaryCard;