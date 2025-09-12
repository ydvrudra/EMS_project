import axios from "axios";
import toast from "react-hot-toast";
import { showToastError } from "../../../utils/showToastError";
import { useNavigate } from "react-router-dom";




export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width:"70px",
    },
    
    {
        name: "Name",
        selector: (row) => row.name,
        width:"160px",
         center:true,
         sortable:true,
    },

    {
        name: "Image",
        selector: (row) => row.profileImage,
        width:"90px",
         center:true,
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width:"180px",
        sortable: true,
        center:true,
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        width:"150px",
        sortable: true,
        center:true,
    },

    {
        name: "Action",
        selector: (row) => row.action,
        center:true,
    }
]



export const fetchDepartments = async () => {

           let departments
            try {
                const res = await axios.get("http://localhost:5000/api/department", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                departments = res.data.departments;
                console.log("All departments", res.data.departments);
                }
            } catch (error) {
                showToastError(error)
            }
            return departments;
        };


// fetch employees for salary form

export const fetchemployees = async (id) => {

           let employees
            try {
                const res = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                employees = res.data.employees;
                console.log("All employees", res.data.employees);
                }
            } catch (error) {
                showToastError(error)
            }
            return employees;
        };


export const EmployeeButtons = ({ id }) => {
 // console.log("EmployeeButtons received id:", id);
    const Navigate = useNavigate();

    return (
        <div className="space-x-2">
            <button 
            onClick={() => Navigate(`/admin-dashboard/employees/${id}`)}
            className="px-2 py-1 bg-teal-600 hover:bg-teal-800 text-white rounded">View
            </button>

            <button
            onClick={() => Navigate(`/admin-dashboard/employee/edit/${id}`)} 
            className="px-2 py-1 bg-green-600 hover:bg-green-800 text-white rounded">Edit
            </button>

            <button
            onClick={() => Navigate(`/admin-dashboard/employees/salary/${id}`)} 
             className="px-2 py-1 bg-yellow-600 hover:bg-yellow-800 text-white rounded">Salary
            </button>

              <button className="px-2 py-1 bg-red-600 hover:bg-red-800 text-white rounded">Leave</button>
        </div>
    )
};