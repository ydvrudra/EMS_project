// frontend/api/axiosInstance.jsx

import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: import.meta.env.VITE_API_URL,
  baseURL: "https://ems-backend-825w.onrender.com",
  withCredentials: true, 
});

export default axiosInstance;
