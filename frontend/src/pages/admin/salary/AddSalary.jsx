import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { showToastError } from '../../../utils/showToastError';
import Loader from '../../../components/Loader';
import { fetchDepartments , fetchemployees } from '../employee/EmpHelper';
import MetaData from '../../../components/MetaData';
import axiosInstance from '../../../api/axiosInstance';


function AddSalary() {

  const [salary, setSalary] = useState({
    employeeId:null,
    basicSalary:0,
    allowances:0,
    deductions:0,
    payDate:null,
  });
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees , setemployees] = useState([]);

  

  const Navigate = useNavigate();

  const handleDepartment = async (e) => {
    const emps = await fetchemployees(e.target.value);
    setemployees(emps);
  }

  const handleChange = (e) => {
    const {name, value } = e.target;
      setSalary((preData) => ({ ...preData, [name] : value }))
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try { 
         await new Promise((resolve) => setTimeout(resolve, 2000));

        const res = await axiosInstance.post(`/api/salary/add-salary` ,salary, {
          headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
          });

        if (res.data.success) {
            toast.success("Salary Added successfully");
            Navigate("/admin-dashboard/employees");
            console.log("salary data", res.data);
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
    <MetaData title= "Add Salary"/>
    { departments ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit} action="" className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
            {/* Department */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
               name='department' 
               onChange={handleDepartment}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id} className="">{dept.dep_name}</option>
                ))}
                </select>
          </div>  

          
            {/* Employee */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Employee
            </label>
            <select
               name='employeeId' 
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp._id} className="">{emp.employeeId}</option>
                ))}
                </select>
          </div>  

          {/* Basic Salary */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Basic Salary
            </label>
            <input
               type="number" 
               name='basicSalary'
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Basic Salary'
               required 
               />
          </div>

           {/* Allowances */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Allowances
            </label>
            <input
               type="number" 
               name='allowances'
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Allowances'
               required 
               />
          </div> 

           {/* Deductions */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Deductions
            </label>
            <input
               type="number" 
               name='deductions'
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               placeholder='Deductions'
               required 
               />
          </div> 

           {/* Pay Date */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Pay Date
            </label>
            <input
               type="date" 
               name='payDate'
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               />
          </div> 
        </div>

        <button
        type='submit'
         disabled={loading} 
         className={`w-full ${loading ? "bg-teal-600 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-800"} mt-6  text-white font-bold py-2 px-4 rounded transition`}>{loading ? "Adding..." : "Add Salary"}
         </button>
      </form>
    </div>
    ) : ( <Loader/>) }
    </>
  )
}

export default AddSalary;