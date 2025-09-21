//src/pages/admin/employee/edit
import React, { useEffect, useState } from 'react'
import { fetchDepartments } from './EmpHelper';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { showToastError } from '../../../utils/showToastError';
import Loader from '../../../components/Loader';
import MetaData from '../../../components/MetaData';
import axiosInstance from '../../../api/axiosInstance';



function EditEmployee() {

  const backendURL = import.meta.env.VITE_API_URL;


  const [employee, setEmployee] = useState({
    name:'',
    maritalStatus:'',
    designation:'',
    salary:0,
    department:'',
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState(null);

  const {id} = useParams();
  

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value } = e.target;
      setEmployee((preData) => ({ ...preData, [name] : value }))
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try { 
        // await new Promise((resolve) => setTimeout(resolve, 2000));

            const formData = new FormData();
            formData.append("name", employee.name);
            formData.append("maritalStatus", employee.maritalStatus);
            formData.append("designation", employee.designation);
            formData.append("salary", employee.salary);
            formData.append("department", employee.department);
    
    if (employee.profileImage) {
      formData.append("image", employee.profileImage); 
    }
        const res = await axiosInstance.put(`/api/employee/${id}` ,formData, {
          headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
           }
          });

        if (res.data.success) {
            toast.success("Employee Updated successfully");
            Navigate("/admin-dashboard/employees");
            console.log("updated emp data", res.data);
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
                    const employee = res.data.employee;
                    //console.log("Profile Image from backend:", employee.userId?.profileImage);

                    setEmployee((prev) => ({
                        ...prev,
                        name:employee.userId.name,
                        maritalStatus:employee.maritalStatus,
                        designation:employee.designation,
                        salary:employee.salary,
                        department:employee.department,
                        profileImage: employee.userId.profileImage, 
                    }));
                    console.log("employee getby id", res.data.employee);

                }
            } catch (error) {
               showToastError(error) 
            }
        };
        getEmployeebyId();
    },[]);
    

  return (
    <>
   <MetaData title={employee.name ? `Edit: ${employee.name}` : 'Edit Employee'} />
    { departments && employee ? (
    <div className="max-w-3xl mx-auto w-96 sm:w-full mt-12 bg-gray-100 p-4 py-6 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Employee</h2>
      <form onSubmit={handleSubmit} action="" className="shadow-md shadow-gray-300 border-2 rounded-md p-4">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              name
            </label>
            <input
               type="text" 
               name='name'
               value={employee.name}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Enter Name'
               required 
               />
          </div>

          {/* Marital status */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
               name='maritalStatus'
               value={employee.maritalStatus} 
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
               value={employee.designation}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Designation'
               required 
               />
          </div>

           {/* Salary */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
               type="number" 
               name='salary'
               value={employee.salary}
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Salary'
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
               onChange={handleChange}
               value={employee.department}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id} className="">{dept.dep_name}</option>
                ))}
                </select>
          </div>  

          {/* File */}
       <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
        
        <div className="flex items-center space-x-2">
            {/* Image Preview */}
            {employee.profileImage && typeof employee.profileImage === 'string' && (
            <img
                src={employee.profileImage ? `${backendURL}/uploads/${employee.profileImage}` : "/default-avatar.png"}
                alt="Profile Preview"
                className="w-10 h-10 rounded-full object-cover border-2 border-teal-500 shadow-md"
            />
            )}
        {employee.profileImage && typeof employee.profileImage !== 'string' && (
        <img
            src={URL.createObjectURL(employee.profileImage)}
            alt="Profile Preview"
            className="w-10 h-10 rounded-full object-cover border-2 border-teal-500 shadow-md"
        />
        )}

        {/* File Input */}
        <input
        type="file"
        name="image"
        onChange={(e) => setEmployee((prev) => ({
            ...prev,
            profileImage: e.target.files[0],
        }))}
        className="block text-[10px] text-gray-500 file:py-2 file:rounded-full file:border-0
                    file:text-[10px] file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100
                    cursor-pointer"
        accept="image/*"
        />
            </div>
          </div>
        </div>

        <button
        type='submit'
         disabled={loading} 
         className={`w-full ${loading ? "bg-teal-600 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-800"} mt-6  text-white font-bold py-2 px-4 rounded transition`}>{loading ? "Updating..." : "Update Employee"}
         </button>
      </form>
    </div>
    ) : ( <Loader/>) }
    </>
  )
}

export default EditEmployee