import React, {  useState } from 'react'
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
//import { fetchDepartments } from './EmpHelper';
import toast from 'react-hot-toast';
import { showToastError } from '../../../utils/showToastError';
import axiosInstance from '../../../api/axiosInstance';
//import Loader from '../../../components/Loader';




function AddEmpLeave() {

    const {user} = useAuth();
    const Navigate = useNavigate();

      const [ leave, setLeave ] = useState({
       userId: user._id,
      }); 
      const [loading, setLoading] = useState(false);


      const handleChange = (e) => {

        const { name , value } = e.target;
        setLeave((prev) => ( { ...prev, [name] : value }));
      }
      

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
       // console.log("lev", leave);
            try {   
                 //await new Promise((resolve) => setTimeout(resolve, 2000));     
                const res = await axiosInstance.post(`/api/leave/add-leave`, leave, {
                    headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                         }
                        });
                    if (res.data.success) {
                        toast.success("Leeave Added successfully");
                        Navigate(`/employee-dashboard/leaves/${user._id}`)
                      //console.log("added leave", res.data.leave);
        
                     }
                    } catch (error) {
                       showToastError(error) 
                    }
                    finally{
                        setLoading(false);
                    }
       }
    
  return (
    <>
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96 sm:w-full">
      <h2 className="text-2xl font-bold mb-6">Request For Leave</h2>
      <form  onSubmit={handleSubmit}  action="" className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Leave Type*/}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
               name='leaveType'
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               >
                <option value="">Select Department</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                </select>
          </div>

          {/* from Date */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              From Date
            </label>
            <input
               type="date" 
               name='startDate'
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               />
          </div>

           {/* To Date */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              To Date
            </label>
            <input
               type="date" 
               name='endDate'
               onChange={handleChange}
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               />
          </div>

           {/* description */}
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
               name='reason'
               onChange={handleChange}
               placeholder="Reason"
               className="mt-1 p-2 block w-full border border-gray-300 rounded"
               required 
               />
          </div>
        </div>

        <button
        type='submit'
         disabled={loading} 
         className={`w-full ${loading ? "bg-teal-600 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-800"} mt-6  text-white font-bold py-2 px-4 rounded transition`}>{loading ? "Requesting..." : "Request Leave"}
         </button>

         
      </form>
    </div>
    </>
  )
}

export default AddEmpLeave;