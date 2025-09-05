import express from "express";
import { LoginUser, registerUser , verify} from "../controllers/userController.js";
import authmiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get('/verify',authmiddleware, verify);

export default router;