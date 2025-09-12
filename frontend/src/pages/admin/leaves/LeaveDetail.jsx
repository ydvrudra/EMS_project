import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import toast from "react-hot-toast";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";

const LeaveDetail = () => {

    const [leave, setLeave] = useState(null)

    const {id} = useParams();

      useEffect(() => {
            const getAllLeaves = async () => {
                try {
                    // Fetch department details using the id
                    const res = await axios.get(`http://localhost:5000/api/leave/leave-detail/${id}`, {
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
        <div className="max-w-3xl mx-auto mt-10 bg-gray-100 p-10 rounded shadow-lg w-96 sm:w-full">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Leave Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="">
                    <img src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`} alt="" className="rounded-full border w-72 h-72" />
                </div>
                <div className="">
                    <div className="flex space-x-3 mb-3">
                        <p className="text-lg font-bold">Name:</p>
                        <p className="font-medium">{leave.employeeId.userId.name}</p>
                    </div>

                     <div className="flex space-x-3 mb-3">
                        <p className="text-lg font-bold">Emp ID:</p>
                        <p className="font-medium">{leave.employeeId.employeeId}</p>
                    </div>

                     <div className="flex space-x-3 mb-3">
                        <p className="text-lg font-bold">Leave Type:</p>
                        <p className="font-medium">{leave.leaveType}</p>
                    </div>

                     <div className="flex space-x-3 mb-3">
                        <p className="text-lg font-bold">Reason:</p>
                        <p className="font-medium">{leave.reason}</p>
                    </div>

                     <div className="flex space-x-3 mb-3">
                        <p className="text-lg font-bold">Department:</p>
                        <p className="font-medium">{leave.employeeId.department.dep_name}</p>
                    </div>

                     <div className="flex space-x-3 mb-3">
                        <p className="text-lg font-bold">Start Date:</p>
                        <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
                    </div>

                    <div className="flex space-x-3 mb-3">
                        <p className="text-lg font-bold">End Date:</p>
                        <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
                    </div>

                     <div className="flex space-x-3 mb-3">
                        <p className="text-lg font-bold">
                            {leave.status === "Pending" ? "Action:" : "Status:"}
                        </p>
                        {leave.status === "Pending" ? (
                            <div className="flex space-x-2">
                                <button className="px-2 py-1 text-white bg-teal-600 hover:bg-teal-800">Accept</button>
                                <button className="px-2 py-1 text-white bg-red-500 hover:bg-red-700">Reject</button>
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