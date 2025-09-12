import express from 'express';
import authmiddleware from '../middleware/authMiddleware.js';
import { changePassword } from '../controllers/settingController.js';

const router = express.Router();

router.put('/change-password', authmiddleware, changePassword);


export default router;