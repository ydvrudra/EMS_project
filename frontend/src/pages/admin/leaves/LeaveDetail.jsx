import React, { useState , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";
import axiosInstance from "../../../api/axiosInstance";

const LeaveDetail = () => {

    const [leave, setLeave] = useState(null)

    const {id} = useParams();

    const Navigate = useNavigate();

    const changeStatus = async (id, status) => {
         try {
                    const res = await axiosInstance.put(`/api/leave/${id}`,{status}, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    if (res.data.success) {
                        Navigate('/admin-dashboard/leaves');    
                    }
                } catch (error) {
                   showToastError(error) 
                }
    }

      useEffect(() => {
            const getAllLeaves = async () => {
                try {
                    const res = await axiosInstance.get(`/api/leave/leave-detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    if (res.data.success) {
                        setLeave(res.data.leave);
    
                    }
                } catch (error) {
                   showToastError(error) 
                }
            };
            getAllLeaves();
    
        },[]);
    
    return(
        <>{leave ? (
        <div className="max-w-3xl mx-auto w-96 sm:w-full mt-12 bg-gray-100 p-4 py-6 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Leave Details
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-24 rounded shadow-lg shadow-gray-300 border-2 p-2 md:p-10">
                <div className="">
                    <img src={`/${leave.employeeId.userId.profileImage}`} alt="" className="rounded-full border-2 w-40 h-40 md:w-64 md:h-64" />
                </div>
                <div className="">
                    <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Name:</p>
                        <p className="text-sm sm:text-lg">{leave.employeeId.userId.name}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Emp ID:</p>
                        <p className="text-sm sm:text-lg">{leave.employeeId.employeeId}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Leave Type:</p>
                        <p className="text-sm sm:text-lg">{leave.leaveType}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Reason:</p>
                        <p className="text-sm sm:text-lg">{leave.reason}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Department:</p>
                        <p className="text-sm sm:text-lg">{leave.employeeId.department.dep_name}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Start Date:</p>
                        <p className="text-sm sm:text-lg">{new Date(leave.startDate).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">End Date:</p>
                        <p className="text-sm sm:text-lg">{new Date(leave.endDate).toLocaleDateString()}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">
                            {leave.status === "Pending" ? "Action:" : "Status:"}
                        </p>
                        {leave.status === "Pending" ? (
                            <div className="flex space-x-2">
                                <button 
                                onClick={() => changeStatus(leave._id,'Approved')}
                                className="px-2 py-1 text-white bg-teal-600 hover:bg-teal-800">Approve</button>
                                <button
                                onClick={() => changeStatus(leave._id,'Rejected')}
                                 className="px-2 py-1 text-white bg-red-500 hover:bg-red-700">Reject</button>
                            </div>
                        ) : (
                            <p className="font-medium">{leave.status}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        ): <Loader/> }
        </> 
    );
};

export default LeaveDetail;