import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Loader from "../../components/Loader";
import MetaData from "../../components/MetaData";
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


   if (loading) {
    return <Loader />;
  }

    if(!user){
        Navigate("/login");
    }


    return(
        <>
        <MetaData title={user.name}/>
        <div className="flex">
            <AdminSidebar/>
            <div className="flex-1 ml-44 sm:ml-60 bg-gray-100 h-screen">
                <AdminNavbar/>
                <Outlet/>
            </div>
        </div>
        </>
    );
};
  export default AdminDashboard;