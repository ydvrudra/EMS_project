import express from 'express';
import authmiddleware from '../middleware/authMiddleware.js';
import { AddLeave, getAllLeave, getLeaveById, getLeaveDetail, updateLeave } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/add-leave', authmiddleware, AddLeave);
router.get('/leave-detail/:id', authmiddleware, getLeaveDetail);  
router.get('/:id/:role',authmiddleware, getLeaveById);
router.get('/',authmiddleware, getAllLeave);
router.put('/:id', authmiddleware, updateLeave);

export default router;