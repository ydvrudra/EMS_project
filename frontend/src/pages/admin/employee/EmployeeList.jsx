import React from "react";
import { Link } from "react-router-dom";


const EmployeeList = () => {


    return(
        <>
        <div className="p-5">
          <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between  items-center space-x-4 mt-4">
        <input 
             type="text" 
             placeholder="Search by Emp.name" 
             className="px-4 py-1 bg-white shadow border" />
        <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-600 hover:bg-teal-800 text-white rounded">Add New Employee
        </Link>
         </div>
        </div>
        </>
    )
};

export default EmployeeList;