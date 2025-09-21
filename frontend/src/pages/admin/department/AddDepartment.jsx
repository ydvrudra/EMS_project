import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { showToastError } from "../../../utils/showToastError";
import MetaData from "../../../components/MetaData";
import axiosInstance from "../../../api/axiosInstance";


const AddDepartment = () => {

    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    });
   
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    }
    

const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    //console.log('dep',department);
    try { 
         //await new Promise((resolve) => setTimeout(resolve, 2000));
        const res = await axiosInstance.post("/api/department/add-department", department, {
          headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`
           }
          });
        if (res.data.success) {
            toast.success("Department added successfully");
            Navigate("/admin-dashboard/departments");
            console.log("res", res.data);
        } 
        
    } catch (error) {
        console.log("Error object:", error);
  console.log("Error response data:", error.response?.data);
       showToastError(error)  
    }
    finally {
        setLoading(false);
    }
}

  return ( 
    <div>
        <MetaData title="Add Department"/>
      <div className="max-w-3xl mx-auto p-4 sm:p-6 mt-12 w-96 sm:w-full ">
        <h2 className="text-2xl font-bold my-6 text-center">Add New Department</h2>
           <div className="m-2 p-4 rounded shadow-md border-2 shadow-gray-300 ">
             <form onSubmit={handleSubmit} action="" className="">
                <div className="">
                    <label htmlFor="dep_name" className="block text-gray-700">Department Name</label>
                    <input type="text"
                           name="dep_name"
                           onChange={handleChange}
                           value={department.dep_name}
                           placeholder="Enter department name"
                           
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
                      disabled={loading} 
                     className={`w-full ${loading ? "bg-teal-600 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-800"} px-4 py-2 text-white rounded transition`}>{loading ? "Adding..." : "Add Department"}</button>
                </div>
            </form>
           </div>
      </div>
    </div>
  
  );
}   
export default AddDepartment;