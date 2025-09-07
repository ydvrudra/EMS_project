// utils/errorHandler.js
export const handleError = (res, error, statusCode = 500) => {
  console.error("Backend Error:", error); 

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong. Please try again later.", 
  });
};


// // CustomError class
// export class CustomError extends Error {
//   constructor(message, statusCode = 400) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }

// // error handler middleware
// export const handleError = (err, req, res, next) => {
//   console.error("🔧 Backend Error:", err);

//   if (err instanceof CustomError) {
//     return res.status(err.statusCode).json({
//       success: false,
//       message: err.message,  
//     });
//   }

//   return res.status(500).json({
//     success: false,
//     message: "Something went wrong. Please try again later.",
//   });
// };
