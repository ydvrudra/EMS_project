import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
//import toast from "react-hot-toast";
import { showToastError } from "../../utils/showToastError";
import Loader from "../../components/Loader";
import axiosInstance from "../../api/axiosInstance";

const ViewEmpProfile = () => {
    
      const backendURL = import.meta.env.VITE_API_URL;

    const [employee, setEmployee] = useState(null)

    const {id} = useParams();
    

     useEffect(() => {
        const getEmployeebyId = async () => {
            try {
                // Fetch department details using the id
                const res = await axiosInstance.get(`/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                    setEmployee(res.data.employee);
                    //console.log("employee getby id", res.data.employee);

                }
            } catch (error) {
               showToastError(error) 
            }
        };
        getEmployeebyId();

    },[]);
    return(
        <>{employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-gray-100 p-6 w-96 sm:w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Employee Details
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-24 rounded shadow-lg shadow-gray-300 border-2 p-2 md:p-10">
                <div className="">
                    <img src={`${backendURL}/uploads/${employee.userId?.profileImage}`} alt="" className="rounded-full border-2 w-40 h-40 md:w-64 md:h-64" />
                </div>
                <div className="">
                    <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Name:</p>
                        <p className="text-sm sm:text-lg  font-medium">{employee.userId?.name}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Employee ID:</p>
                        <p className="text-sm sm:text-lg  font-medium">{employee.employeeId}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">DOB:</p>
                        <p className="text-sm sm:text-lg  font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Gender:</p>
                        <p className="text-sm sm:text-lg  font-medium">{employee.gender}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Department:</p>
                        <p className="text-sm sm:text-lg  font-medium">{employee.department?.dep_name}</p>
                    </div>

                     <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm sm:text-lg font-bold">Marital Status:</p>
                        <p className="text-sm sm:text-lg  font-medium">{employee.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
        ): <Loader/> }
        </> 
    );
};

export default ViewEmpProfile;