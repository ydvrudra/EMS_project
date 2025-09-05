import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const EmployeeDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
      <h2 className="text-xl">Welcome, {user?.name}</h2>
      <h3 className="text-lg">Email: {user?.email}</h3>
    </div>
  );
};

export default EmployeeDashboard;
