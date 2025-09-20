import React from "react";
import {useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { showToastError } from "../../../utils/showToastError";
import MetaData from "../../../components/MetaData";
import axiosInstance from "../../../api/axiosInstance";



const EditDepartment = () => {
    const [ department, setDepartment ] = useState([])
    const [ deptLoading, setDeptLoading ] = useState(false);
    
    const {id} = useParams();
    const Navigate = useNavigate();


    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({ ...department, [name]: value });
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setDeptLoading(true);
        try {
           // await new Promise((resolve) => setTimeout(resolve, 2000));
            const res = await axiosInstance.put(`/api/department/${id}`, department, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`        
                }
            });
            if(res.data.success){
                toast.success("Department updated successfully");
                Navigate("/admin-dashboard/departments");
                console.log("dept updated successfully", res.data);
            }
        } catch (error) {
            showToastError(error)  
        }

    }

    useEffect(() => {
        const getDepartmentbyId = async () => {
            setDeptLoading(true);
            try {
                // Fetch department details using the id
                const res = await axiosInstance.get(`/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                    setDepartment(res.data.department);
                    console.log("department getby id", res.data.department);

                }
            } catch (error) {
                showToastError(error) 
            }
            finally {
                setDeptLoading(false);
            }
        };
        getDepartmentbyId();

    },[]);

    return ( 
          <div>
            <MetaData title= "Edit Department"/>
      <div className="max-w-3xl mx-auto p-2 sm:p-6 bg-white  mt-10 w-96 sm:w-full ">
        <h2 className="text-2xl font-bold my-6 text-center">Edit Department</h2>
            <form onSubmit={handleSubmit} action="" className="p-4 m-4 shadow-md border-2 rounded shadow-gray-300">
                <div className="">
                    <label htmlFor="dep_name" className="block text-gray-700">Department Name</label>
                    <input type="text"
                           name="dep_name"
                           onChange={handleChange}
                           value={department.dep_name}
                           placeholder="Enter department name"
                           required
                           className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                </div>
                <div className="mt-4">
                    <label htmlFor="description" className="block  text-gray-700">Description</label>
                    <textarea 
                           name="description" 
                           placeholder="description" 
                           onChange={handleChange}
                            value={department.description}
                           className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    ></textarea>
                </div>
                <div className="mt-4">
                    <button
                     type="submit"
                      disabled={deptLoading} 
                     className={`w-full ${deptLoading ? "bg-teal-600 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-800"} px-4 py-2 text-white rounded transition`}>{deptLoading ? "Updating..." : "Update Department"}</button>
                </div>
            </form>
      </div>
    </div>
    )
}   
export default EditDepartment;