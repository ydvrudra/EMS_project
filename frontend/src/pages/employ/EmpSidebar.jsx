import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt,FaUsers , FaCalendarAlt,FaMoneyBillWaveAlt ,FaCogs } from "react-icons/fa";
import { useAuth } from "../../context/authContext";


const EMpSidebar = () => {

    const {user} = useAuth();
    return(
        <>
        <div className="bg-gray-800 text-white w-64 h-screen fixed left-0 top-0 bottom-0 space-y-2">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h3 className="text-2xl text-center font-great">{user.name}</h3>
            </div>
            <div className="px-4">

                {/* dashboard */}
                <NavLink to='/employee-dashboard'
                className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FaTachometerAlt />
                <span className="">Dashboard</span>
                </NavLink>

                 {/* my profile */}
                <NavLink to={`/employee-dashboard/profile/${user._id}`}
                 className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FaUsers />
                <span className="">My profile</span>
                </NavLink>

                 {/* leaves */}
                <NavLink to={`/employee-dashboard/leaves/${user._id}`}
                className={`flex items-center space-x-4 py-2.5 px-4 rounded`}>
                <FaCalendarAlt  />
                <span className="">Leaves</span>
                </NavLink>

                {/* salary */}
                <NavLink to={`/employee-dashboard/salary/${user._id}`}
                className={({isActive}) => `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}
                end
                >
                <FaMoneyBillWaveAlt  />
                <span className="">Salary</span>
                </NavLink>
               
                {/* settings */}
                <NavLink to='/employee-dashboard/setting'
                className={`flex items-center space-x-4 py-2.5 px-4 rounded`}>
                <FaCogs />
                <span className="">Setting</span>
                </NavLink>
            </div>
        </div>
        </>
    );
}
export default EMpSidebar;