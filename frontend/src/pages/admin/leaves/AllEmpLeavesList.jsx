import React from "react";
//import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from "axios";
import {columns, LeaveButtons } from "./LeaveHelper";
import DataTable from "react-data-table-component";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";
//import { useAuth } from "../../../context/authContext";

const AllEmpLeavesList = () => {

      const [leaves, setLeaves] = useState([])
      const [loading, setLoading ] = useState(false);
     //const[filteredLeaves, setFilteredLeaves] = useState([]);
    
        // const {user} = useAuth();
    
            const getAllLeave = async () => {
                setLoading(true);
                try {
                    //  await new Promise((resolve) => setTimeout(resolve, 2000));  
                    const res = await axios.get(`http://localhost:5000/api/leave`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    if (res.data.success) {
                       let sno = 1;
                       const data = await res.data.leaves.map((lev) => ({                            
                       _id: lev._id,
                       sno: sno++,
                       employeeId: lev.employeeId.employeeId,
                       name: lev.employeeId.userId.name,
                       leaveType:lev.leaveType,
                       department:lev.employeeId.department.dep_name,
                       days:
                        new Date(lev.endDate).getDate()- new Date(lev.startDate).getDate(),
                       status:lev.status,
                       action:( <LeaveButtons id = { lev._id }/>)
                        }))
                        setLeaves(data);                         
                        console.log("All leave", res.data.leaves);
    
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
    
    
    // const filterSalary = (q) => {
    //     const filterRecord = leaves.filter((lav) => lav.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase()) )
    //     setFilteredLeaves(filterRecord);
    // }
    
    
      
    return( 
        <>
        {loading ? (
          <Loader/>
        ) : (
      <div className="p-5">
        <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
       </div>
         <div className="flex justify-between  items-centermt-4">
        <input 
             type="text" 
             placeholder="Search by Emp.name" 
             className="px-4 py-1 bg-white shadow border" 
             />

             <div className="space-x-3">
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">Pending</button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">Approved</button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">Rejected</button>
             </div>
         </div>
        
        <div className="">
           <DataTable
            columns={columns}
            data={leaves}
            pagination
         />
        </div>
        </div>
         )}
        </>
    )
};

export default AllEmpLeavesList;