import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import toast from "react-hot-toast";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";

const ViewEmployee = () => {

    const [employee, setEmployee] = useState(null)

    const {id} = useParams();
    

     useEffect(() => {
        const getEmployeebyId = async () => {
            try {
                // Fetch department details using the id
                const res = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                    setEmployee(res.data.employee);
                    console.log("employee getby id", res.data.employee);

                }
            } catch (error) {
               showToastError(error) 
            }
        };
        getEmployeebyId();

    },[]);
    return(
        <>{employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-gray-100 p-10 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Employee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="">
                    <img src={`http://localhost:5000/${employee.userId?.profileImage}`} alt="" className="rounded-full border w-72 h-72" />
                </div>
                <div className="">
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Name:</p>
                        <p className="font-medium">{employee.userId?.name}</p>
                    </div>

                     <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Employee ID:</p>
                        <p className="font-medium">{employee.employeeId}</p>
                    </div>

                     <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">DOB:</p>
                        <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
                    </div>

                     <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Gender:</p>
                        <p className="font-medium">{employee.gender}</p>
                    </div>

                     <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Department:</p>
                        <p className="font-medium">{employee.department?.dep_name}</p>
                    </div>

                     <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Marital Status:</p>
                        <p className="font-medium">{employee.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
        ): <Loader/> }
        </> 
    );
};

export default ViewEmployee;