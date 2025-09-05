// utils/showToastError.js
import toast from "react-hot-toast";

export const showToastError = (error, fallbackMessage = "Something went wrong") => {
   console.error("full Error:", error);
  const message =
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage;

  toast.error(message); 
};
