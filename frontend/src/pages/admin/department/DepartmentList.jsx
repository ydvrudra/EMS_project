import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from "./DeptHelper";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
//import toast from "react-hot-toast";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";


const DepartmentList = () => {

    const [departments, setDepartments] = useState([]);
    const [deptLoading, setDeptLoading] = useState(false);
    const [searchDeptName, setSearchDeptName] = useState([]);

    const onFilterDepartment = (id) => {
        const depData = departments.filter((item) => item._id !== id);
        setDepartments(depData);
    }


    const searchDept = (e) => {
        const record = departments.filter((item) => item.dep_name.toLowerCase().includes(e.target.value.toLowerCase()) )
        setSearchDeptName(record);
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            setDeptLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/department", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                    let sno = 1;
                    const data = await res.data.departments.map((dept) => ({
                        
                        _id: dept._id,
                        sno: sno++,
                        dep_name: dept.dep_name,
                        action: (<DepartmentButtons id={dept._id} onFilterDepartment= {onFilterDepartment} onFetchDepartments={fetchDepartments}/>)
                    }))
                    
                    setDepartments(data);
                    setSearchDeptName(data)
                    //console.log("All departments", res.data.departments);
                }
            } catch (error) {
                showToastError(error)

            }
            finally {
                setDeptLoading(false);
            }
        };
        fetchDepartments();
    },[]);

    if (deptLoading) {
    return <Loader />;
  }


  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between  items-center space-x-4 mt-4">
        <input 
             onChange={searchDept}
             type="text" 
             placeholder="Search by dep. name" 
             className="px-4 py-1 bg-white shadow border" />
        <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600 hover:bg-teal-800 text-white rounded">Add New Department
        </Link>
      </div>

      <div className="">
        <DataTable
        columns={columns}
        data={searchDeptName} 
        pagination
        />
      </div>
    </div>
  );
}   
export default DepartmentList;