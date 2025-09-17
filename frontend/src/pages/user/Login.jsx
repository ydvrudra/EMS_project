import axiosInstance from "../../api/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { showToastError } from "../../utils/showToastError";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const {login} = useAuth();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/users/login",
        { email, password }
      );
      console.log("resp", response.data);

      if (response.data.success) {
        login(response.data.user, response.data.token)
        console.log("user", response.data.user);
        localStorage.setItem("token", response.data.token);
        if(response.data.user.role === "admin"){
          toast.success("Login successful!");
          navigate("/admin-dashboard");
        } else {
          toast.success("Login successful!");
          navigate("/employee-dashboard");
          return;
        }
      }
    } catch (error) {
      showToastError(error)
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col  justify-center items-center relative bg-white px-4">
      {/* Top Half Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-teal-600 z-0" />

      {/* Content */}
      <div className="z-10 w-full max-w-sm">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl text-center mb-8">
          <span className="font-great  text-blue-100">Employee</span>{" "}
          <span className="font-great text-white">Management</span>{" "}
          <span className="font-great text-green-200">System</span>
        </h1>

        {/* Login Box */}
        <div className="bg-white p-6 sm:p-8 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Login</h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              placeholder="Enter your email"
              className={`w-full mb-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-teal-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-3">{errors.email}</p>
            )}

            {/* Password */}
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              placeholder="Enter password"
              className={`w-full mb-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-teal-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-3">{errors.password}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
              } text-white py-2 rounded mt-2 transition`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-teal-600 hover:underline"
            >
              Register
            </button>
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
