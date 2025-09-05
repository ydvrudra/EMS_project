import axios from "axios";
import toast from "react-hot-toast";
import { showToastError } from "../../../utils/showToastError";




export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Image",
        selector: (row) => row.image,
        sortable: true,
    },
    {
        name: "Name",
        selector: (row) => row.name,
    },
    {
        name: "DOB",
        selector: (row) => row.name,
    },
    {
        name: "Department",
        selector: (row) => row.name,
    },
    {
        name: "action",
        selector: (row) => row.name,
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