import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt,FaUsers ,FaBuilding, FaCalendarAlt,FaMoneyBillWaveAlt ,FaCogs } from "react-icons/fa";


const AdminSidebar = () => {
    return(
        <>
        <div className="bg-gray-800 text-white w-64 h-screen fixed left-0 top-0 bottom-0 space-y-2">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h3 className="text-2xl text-center font-great">Employee Rudra</h3>
            </div>
            <div className="px-4">

                {/* dashboard */}
                <NavLink to='/admin-dashboard'
                className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FaTachometerAlt />
                <span className="">Dashboard</span>
                </NavLink>

                {/* employee */}
                <NavLink to='/admin-dashboard/employees'
                 className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FaUsers />
                <span className="">Employee</span>
                </NavLink>

                {/* departments */}
                <NavLink to='/admin-dashboard/departments'
               className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
               end
                >
                <FaBuilding />
                <span className="">Departments</span>
                </NavLink>
                 
                 {/* leaves */}
                <NavLink to='/admin-dashboard/leaves'
                className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FaCalendarAlt  />
                <span className="">Leaves</span>
                </NavLink>

                 {/* salary */}
                <NavLink to='/admin-dashboard/salary/add-salary'
                className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FaMoneyBillWaveAlt  />
                <span className="">Salary</span>
                </NavLink>

                {/* setting */}
                <NavLink to='/admin-dashboard/setting'
                className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FaCogs />
                <span className="">Setting</span>
                </NavLink>
            </div>
        </div>
        </>
    );
}
export default AdminSidebar;