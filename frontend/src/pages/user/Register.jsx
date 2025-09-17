import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { showToastError } from "../../utils/showToastError";
import { useAuth } from "../../context/authContext";
import axiosInstance from "../../api/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const {login} = useAuth();

  // Live validation handler
  const validateField = (field, value) => {
    let error = "";

    if (field === "name") {
      if (!value.trim()) error = "Name is required";
      else if (value.length < 3)
        error = "Name must be at least 3 characters";
    }

    if (field === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
    }

    if (field === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 8)
        error = "Password must be at least 8 characters";
      else if (!/[A-Z]/.test(value))
        error = "Must contain at least one uppercase letter";
      else if (!/[a-z]/.test(value))
        error = "Must contain at least one lowercase letter";
      else if (!/[0-9]/.test(value))
        error = "Must contain at least one number";
      else if (!/[!@#$%^&*]/.test(value))
        error =
          "Must contain at least one special character (!@#$%^&*)";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Full form validation before submit
  const validateForm = () => {
    validateField("name", name);
    validateField("email", email);
    validateField("password", password);

    return (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      name &&
      email &&
      password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/api/users/register",
        { name, email, password}
      );

      toast.success("Registration successful!");

       // Auto login after registration
      const loginRes = await axiosInstance.post(
      "/api/users/login",
      { email, password }
    );

     if (loginRes.data.success) {
      login(loginRes.data.user);
      localStorage.setItem("token", loginRes.data.token);

      if (loginRes.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    }
  } catch (error) {
      showToastError(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative bg-white px-4">
      {/* Top Half Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-teal-600 z-0" />

      {/* Content */}
      <div className="z-10 w-full max-w-sm">
        {/* Title */}
        <h1 className="text-4xl text-center mb-8">
          <span className="font-great text-blue-100">Employee</span>{" "}
          <span className="font-great text-white">Management</span>{" "}
          <span className="font-great text-green-200">System</span>
        </h1>

        {/* Register Box */}
        <div className="bg-white p-6 sm:p-8 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Register</h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateField("name", e.target.value);
              }}
              placeholder="Enter your name"
              className={`w-full mb-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-teal-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-3">{errors.name}</p>
            )}

            {/* Email */}
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
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
                validateField("password", e.target.value);
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

            {/* Submit Button with loader */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 py-2 rounded text-white transition ${
                loading
                  ? "bg-teal-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Already Registered */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already registered?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-teal-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
