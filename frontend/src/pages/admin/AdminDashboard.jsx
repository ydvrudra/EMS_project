import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
//import AdminSummary from "./AdminSummary";


const AdminDashboard = () => {
    const { user, loading} = useAuth(); 

    const Navigate = useNavigate();
    //console.log("admin from context:", user);


     useEffect(() => {
    if (!loading && !user) {
      Navigate("/login");
    }
  }, [loading, user, Navigate]);


    if(loading){
        return <div>Loading...</div>;
    }

    if(!user){
        Navigate("/login");
    }


    return(
        <>
        <div className="flex">
            <AdminSidebar/>
            <div className="flex-1 ml-64 bg-gray-100 h-screen">
                <AdminNavbar/>
                <Outlet/>
            </div>
        </div>
        </>
    );
};
  export default AdminDashboard;