import React from "react";
//import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import {columns, LeaveButtons } from "./LeaveHelper";
import DataTable from "react-data-table-component";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";
import axiosInstance from "../../../api/axiosInstance";
//import { useAuth } from "../../../context/authContext";

const AllEmpLeavesList = () => {

      const [leaves, setLeaves] = useState([])
      const [loading, setLoading ] = useState(false);
      const[filteredLeaves, setFilteredLeaves] = useState([]);
    
        // const {user} = useAuth();
    
            const getAllLeave = async () => {
                setLoading(true);
                try {
                    //  await new Promise((resolve) => setTimeout(resolve, 2000));  
                    const res = await axiosInstance.get(`/api/leave`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    if (res.data.success) {
                       let sno = 1;
                       const data = await res.data.leaves.map((lev) => ({
                       _id: lev._id,
                       sno: sno++,
                       employeeId: lev.employeeId?.employeeId || 'N/A',
                       name: lev.employeeId?.userId?.name || 'N/A',
                       leaveType:lev.leaveType,
                       department:lev.employeeId?.department?.dep_name || 'N/A',
                       days:
                        new Date(lev.endDate).getDate()- new Date(lev.startDate).getDate(),
                       status:lev.status,
                       action:( <LeaveButtons id = { lev._id }/>)
                        }))
                        setLeaves(data);   
                        setFilteredLeaves(data);
                        //console.log("All leave", res.data.leaves);
    
                    }
                } catch (error) {
                   showToastError(error) 
                }
                finally{
                    setLoading(false)
                }
            };
    
            useEffect(() => {
                getAllLeave();
            },[]);
    
    
    const handleFilter = (e) => {
        const filterRecord = leaves.filter((lev) => lev.employeeId.toLowerCase().includes(e.target.value.toLowerCase()) )
        setFilteredLeaves(filterRecord);
    }
    

     const filterByButton = (status) => {
        const filterRecord = leaves.filter((lev) => lev.status.toLowerCase().includes(status.toLowerCase()) )
        setFilteredLeaves(filterRecord);
    }
    
      
    return( 
        <>
        {loading && filteredLeaves ? (
          <Loader/>
        ) : (
      <div className="p-2 sm:p-6 mt-12 mx-auto w-96 sm:w-full">
        <div className="text-center">
        <h3 className="text-2xl font-bold my-6">Manage Leaves</h3>
       </div>
         <div className="flex justify-between items-center my-4">
        <input 
             type="text" 
             onChange={handleFilter}
             placeholder="Search by Emp. ID" 
             className="px-2 py-1 bg-white shadow border w-32 sm:w-40 text-sm" 
             />

             <div className="space-x-1 sm:space-x-3">
              <button onClick={() => filterByButton("Pending")}
               className="px-2 py-1 text-sm bg-teal-600 text-white hover:bg-teal-700">Pending</button>
              <button onClick={() => filterByButton("Approved")}
               className="px-2 py-1 text-sm bg-teal-600 text-white hover:bg-teal-700">Approved</button>
              <button onClick={() => filterByButton("Rejected")}
               className="px-2 py-1 text-sm bg-teal-600 text-white hover:bg-teal-700">Rejected</button>
             </div>
         </div>
        
        <div className="">
           <DataTable
            columns={columns}
            data={filteredLeaves}
            pagination
         />
        </div>
        </div>
         )}
        </>
    )
};

export default AllEmpLeavesList;