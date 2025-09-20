import React from "react";
import EmpSummaryCard from "./EmpSummaryCard";
import { FaUsers , FaBuilding, FaMoneyBillWaveAlt,FaFileAlt, FaCheckCircle ,FaHourglassEnd , FaTimesCircle   } from "react-icons/fa";


const EmpSummary =  () => {
    return (
    <>
    <div className="mt-12 p-2 sm:p-6 overflow-y-auto">
        <h3 className="text-xl sm:text-2xl font-bold">DashBoard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <EmpSummaryCard icon={ <FaUsers/>} color='bg-teal-600'/>
        </div>

        <div className="mt-14">
            <h4 className="text-2xl font-bold">Leave Details</h4>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <EmpSummaryCard icon={ <FaFileAlt />} text="Leave Applied"  color='bg-teal-600'/>
                <EmpSummaryCard icon={ <FaCheckCircle />} text="Leave Approved" number={6} color='bg-green-600'/>
                <EmpSummaryCard icon={ <FaHourglassEnd />} text="Leave Pending" number={4} color='bg-yellow-600'/>
                <EmpSummaryCard icon={ <FaTimesCircle />} text="Leave Rejected" number={0} color='bg-red-600'/>
                
            </div> */}
        </div>
    </div>
    </>
    );
}
export default EmpSummary;