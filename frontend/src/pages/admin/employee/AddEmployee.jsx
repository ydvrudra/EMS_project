import React, { useEffect, useState } from 'react'
import { fetchDepartments } from './EmpHelper';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { showToastError } from '../../../utils/showToastError';
import MetaData from '../../../components/MetaData';




function AddEmployee() {


  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value, files } = e.target;
    if(name === 'image'){
      setFormData((preData) => ({ ...preData, [name] : files[0]}))
    }
    else{
      setFormData((preData) => ({ ...preData, [name] : value }))
    }
  }
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
     //console.log("Form Data Before Submit:", formData);
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    }); 

    try { 
         await new Promise((resolve) => setTimeout(resolve, 2000));
        const res = await axios.post("http://localhost:5000/api/employee/add-employee", formDataObj, {
          headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`
           }
          });
        if (res.data.success) {
            toast.success("Employee added successfully");
            Navigate("/admin-dashboard/employees");
            console.log("res", res.data);
        } 
        
    } catch (error) {
       showToastError(error)
    }
    finally {
        setLoading(false);
    }
    
}

    useEffect(() => {
      const getAllDept = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments);
      };
      getAllDept();
    },[]);

    
  return (
    <>
    <MetaData title="Add Employee"/> 
    <div className="max-w-4xl mx-auto mt-10  bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add new Employee</h2>
      <form onSubmit={handleSubmit} action="" className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              name
            </label>
            <input
               type="text" 
               name='name'
               value={formData.name || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Enter Name'
               required 
               />
          </div>

           {/* Email */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
               type="email" 
               name="email"
               value={formData.email || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Enter Email'
               required 
               />
          </div>

          {/* Employee ID */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
               type="text" 
               name="employeeId"
               value={formData.employeeId  || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Employee ID'
               required 
               />
          </div>

          {/* Date Of Birth */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Date od Birth
            </label>
            <input
               type="date" 
               name='dob'
               value={formData.dob || ""}
               onChange={handleChange}
               placeholder='DOB'
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               />
          </div> 

          {/* Gender */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
               name='gender'
               value={formData.gender || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
                </select>
          </div>

          {/* Marital status */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
               name='maritalStatus'
               value={formData.maritalStatus || ""} 
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Marital Status'
               required 
               >
                <option value="">Select Marital</option>
                <option value="single">Single</option>
                <option value="merried">Merried</option>
                </select>
          </div>

          {/* Designation */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
               type="text" 
               name='designation'
               value={formData.designation || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Designation'
               required 
               />
          </div>

          {/* Department */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
               name='department' 
               value={formData.department || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id} className="">{dept.dep_name}</option>
                ))}
                </select>
          </div>  

           {/* Salary */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
               type="number" 
               name='salary'
               value={formData.salary || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Salary'
               required 
               />
          </div>  

           {/* password */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
               type="password" 
               name='password'
               value={formData.password || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Password'
               required 
               />
          </div>

          {/* Role */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
               name='role' 
               value={formData.role || ""}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                </select>
          </div>

           {/* File */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              File
            </label>
            <input
               type="file"
               name='image' 
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Upload Image'
               accept='image/*'
               required 
               />
          </div>
        </div>

        <button
        type='submit'
         disabled={loading} 
         className={`w-full ${loading ? "bg-teal-600 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-800"} mt-6  text-white font-bold py-2 px-4 rounded transition`}>{loading ? "Adding..." : "Add Employee"}
         </button>
      </form>
    </div>
    </>
  )
}

export default AddEmployee