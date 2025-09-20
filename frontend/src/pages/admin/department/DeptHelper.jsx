import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { showToastError } from "../../../utils/showToastError";
import axiosInstance from "../../../api/axiosInstance";



export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
        width:"160px",
         center:true,
    },

    
]

export const DepartmentButtons = ({ id,onFetchDepartments }) => {

    const Navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this department?");
        if (confirm) {
         try {
                const res = await axiosInstance.delete(`/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                    toast.success("Department deleted successfully");
                    onFetchDepartments();

                }
            } catch (error) {
               showToastError(error);
            }
        }
    }

    return (
        <div className="space-x-2">
            <button onClick={() => Navigate(`/admin-dashboard/department/${id}`)} className="px-2 py-1 bg-teal-600 hover:bg-teal-800 text-white rounded">Edit</button>
            <button onClick={() => handleDelete(id)} className="px-2 py-1 bg-red-600 hover:bg-red-800 text-white rounded">Delete</button>
        </div>
    )
};
