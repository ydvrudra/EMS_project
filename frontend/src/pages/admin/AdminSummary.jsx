import React, { useEffect, useState } from "react";
import AdminSummaryCard from "./AdminSummaryCard";
import { FaUsers , FaBuilding, FaMoneyBillWaveAlt,FaFileAlt, FaCheckCircle ,FaHourglassEnd , FaTimesCircle   } from "react-icons/fa";
import { showToastError } from "../../utils/showToastError";
import axiosInstance from "../../api/axiosInstance";


const AdminSummary =  () => {

    const [ summary, setSummary ] = useState(null);

    useEffect(() => {
            const fetchSummary = async () => {
                try {
                  const summary = await axiosInstance.get(`/api/dashboard/summary`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setSummary(summary.data);
                } catch (error) {
                    showToastError(error);
                }
        }
        fetchSummary();
    },[])

    if(!summary){
       return <div>Loading....</div>
    }
    
    return (
    <>
    <div className="mt-12 p-2 sm:p-6 overflow-y-auto">
        <h3 className="text-xl sm:text-2xl font-bold">DashBoard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <AdminSummaryCard
             icon={ <FaUsers/>} text="Total Employees" number={summary.totalEmployees} color='bg-teal-600'/>
            <AdminSummaryCard icon={ <FaBuilding/>} text="Total DepartMents" number={summary.totalDepartments} color="bg-yellow-500"/>
            <AdminSummaryCard icon={ <FaMoneyBillWaveAlt/>} text="Monthly Pay" number={`₹${summary.totalSalary}`} color="bg-red-500"/> 
        </div>

        <div className="mt-6 sm:mt-14">
            <h4 className="text-xl sm:text-2xl font-bold">Leave Details</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <AdminSummaryCard icon={ <FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color='bg-teal-600'/>
                <AdminSummaryCard icon={ <FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color='bg-green-600'/>
                <AdminSummaryCard icon={ <FaHourglassEnd />} text="Leave Pending" number={summary.leaveSummary.pending} color='bg-yellow-600'/>
                <AdminSummaryCard icon={ <FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color='bg-red-600'/>
                
            </div>
        </div>
    </div>
    </>
    );
}
export default AdminSummary;