import React,{ useState,createContext,useContext } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
//import { useNavigate } from 'react-router-dom';


const userContext = createContext();

const authContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  // const Navigate = useNavigate();


useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axiosInstance.get("/api/users/verify", {
            headers: { "Authorization": `Bearer ${token}` },
            timeout: 10000 // 10 second timeout
          });

          const data = response.data;
          if (data.success) {
            setUser(data.user);
          } else {
            setUser(null);
            localStorage.removeItem("token");
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("Error verifying user:", error);
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);



    const login = (user,token) => {
        setUser(user);
        localStorage.setItem("token", token);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        //Navigate("/login");
    }

    return (
        <>
        <userContext.Provider value={{user, login, logout, loading, setLoading}}>
            {children}
        </userContext.Provider>
        </>
    );
};

export const useAuth = () => useContext(userContext);
export default authContext;