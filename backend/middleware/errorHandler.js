// utils/errorHandler.js
export const handleError = (res, error, statusCode = 500) => {
  console.error("Backend Error:", error); 

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong. Please try again later.", 
  });
};
