import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

const axiosInstance = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:5000"
    : "https://ems-backend-825w.onrender.com", 
  withCredentials: true,
});

export default axiosInstance;
