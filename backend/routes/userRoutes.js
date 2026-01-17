//routes/userRoutes
import express from "express";
import { LoginUser, registerUser, verify, forgotPassword, resetPassword, adminResetPassword } from "../controllers/userController.js";
import authmiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get('/verify', authmiddleware, verify);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/admin-reset-password', authmiddleware, adminResetPassword);

export default router;
