import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import EMpNavbar from "./EmpNavbar";
import EMpSidebar from "./EmpSidebar";
import Loader from "../../components/Loader";
import MetaData from "../../components/MetaData";

const EmpDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div><Loader/></div>;
  }

  return (
    <div>
        <MetaData title={user.name}/>
        <div className="flex">
            <EMpSidebar/>
            <div className="flex-1 ml-64 bg-gray-100 h-screen">
                <EMpNavbar/>
                <Outlet/>
            </div>
        </div>
    </div>
  );
};

export default EmpDashboard;
