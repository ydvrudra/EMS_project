import React from "react";
import AdminSummaryCard from "./AdminSummaryCard";
import { FaUsers , FaBuilding, FaMoneyBillWaveAlt,FaFileAlt, FaCheckCircle ,FaHourglassEnd , FaTimesCircle   } from "react-icons/fa";


const AdminSummary =  () => {
    return (
    <>
    <div className="p-6">
        <h3 className="text-2xl font-bold">DashBoard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <AdminSummaryCard icon={ <FaUsers/>} text="Total Employees" number={10} color='bg-teal-600'/>
            <AdminSummaryCard icon={ <FaBuilding/>} text="Total DepartMents" number={2} color="bg-yellow-500"/>
            <AdminSummaryCard icon={ <FaMoneyBillWaveAlt/>} text="Monthly Pay" number={`₹300000`} color="bg-red-500"/> 
        </div>

        <div className="mt-14">
            <h4 className="text-2xl font-bold">Leave Details</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <AdminSummaryCard icon={ <FaFileAlt />} text="Leave Applied" number={10} color='bg-teal-600'/>
                <AdminSummaryCard icon={ <FaCheckCircle />} text="Leave Approved" number={6} color='bg-green-600'/>
                <AdminSummaryCard icon={ <FaHourglassEnd />} text="Leave Pending" number={4} color='bg-yellow-600'/>
                <AdminSummaryCard icon={ <FaTimesCircle />} text="Leave Rejected" number={0} color='bg-red-600'/>
                
            </div>
        </div>
    </div>
    </>
    );
}
export default AdminSummary;