import { Navigate  } from "react-router-dom";
import { useAuth } from "../context/authContext";


const RolebasedRoutes = ({children, RequiredRole}) => {

    const {user, loading} = useAuth();

    if(loading){
        return <div>Loading...</div>;
    }

    if (!user) {
    return <Navigate to="/login" replace />;
  }

    if (!RequiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
    //return user ?  children : <Navigate to="/login" replace />;

      return children;

};
export default RolebasedRoutes;