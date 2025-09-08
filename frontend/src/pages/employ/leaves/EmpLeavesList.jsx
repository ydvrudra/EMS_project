import React from "react";
import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from "axios";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../context/authContext";

const EmpLeavesList = () => {

     const [leaves, setLeaves] = useState([])
     const [loading, setLoading ] = useState(false);
     //const[filteredLeaves, setFilteredLeaves] = useState([]);
    
        const {user} = useAuth();
    
            let sno = 1;  
            const getLeaveById = async () => {
                setLoading(true);
                try {
                    //  await new Promise((resolve) => setTimeout(resolve, 2000));  
                    const res = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    if (res.data.success) {
                        setLeaves(res.data.leaves);
                        //setFilteredLeaves(res.data.leave);
                        console.log("leave getby id", res.data.leaves);
    
                    }
                } catch (error) {
                   showToastError(error) 
                }
                finally{
                    setLoading(false)
                }
            };
    
            useEffect(() => {
                getLeaveById();
            },[]);
    
    
    // const filterSalary = (q) => {
    //     const filterRecord = leaves.filter((lav) => lav.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase()) )
    //     setFilteredLeaves(filterRecord);
    // }
    
    
      
    return( 
        <> {loading ? (
            <Loader/>
        ) : (
             <div className="p-5">
          <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between  items-center space-x-4 mt-4">
        <input 
             type="text" 
             placeholder="Search by Emp.name" 
             className="px-4 py-1 bg-white shadow border" />
        <Link to="/employee-dashboard/add-leave" className="px-4 py-1 bg-teal-600 hover:bg-teal-800 text-white rounded">Add New Leave
        </Link>
         </div>
                 
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs uppercase text-gray-700 bg-gray-50 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">SNO</th>
                             <th className="px-6 py-3">Leave Type</th>
                              <th className="px-6 py-3">From</th>
                               <th className="px-6 py-3">To</th>
                                <th className="px-6 py-3">Description</th>
                                 {/* <th className="px-6 py-3">Applied Date</th> */}
                                  <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                                <tr key={leave._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-3">{sno++}</td>
                                    <td className="px-6 py-3">{leave.leaveType}</td>
                                    <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">{leave.reason}</td>
                                    {/* <td className="px-6 py-3">{new Date(leave.appliedDate).toLocaleDateString()}</td> */}
                                    <td className="px-6 py-3">{leave.status}</td>
                                </tr>
                    
                        ))}
                    </tbody>
                </table>
        </div>
        )}
        </>
    )
};

export default EmpLeavesList;