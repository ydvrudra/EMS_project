import { useNavigate } from "react-router-dom";



export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width:"70px",
    },
    
     {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width:"120px",
         center:true,
         sortable:true,
    },

    {
        name: "Name",
        selector: (row) => row.name,
        width:"120px",
         center:true,
         sortable:true,
    },

     {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width:"150px",
         center:true,
         sortable:true,
    },

    {
        name: "Department",
        selector: (row) => row.department,
        width:"180px",
        sortable: true,
        center:true,
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width:"80px",
        center:true,
    },

     {
        name: "Status",
        selector: (row) => row.status,
        width:"120px",
         center:true,
         sortable:true,
    },

    {
        name: "Action",
        selector: (row) => row.action,
        center:true,
    }
]


export const LeaveButtons = ({ id }) => {

    const Navigate = useNavigate();

    const handleView = (id) =>{
        Navigate(`/admin-dashboard/leaves/${id}`)
    }

    return (
        <div className="space-x-2">
            <button 
            onClick={() => handleView(id)}
            className="px-2 py-1 bg-teal-600 hover:bg-teal-800 text-white rounded">View
            </button>
        </div>
    )
};