import express from 'express';
import authmiddleware from '../middleware/authMiddleware.js';
import { AddLeave, getAllLeave, getLeaveById, getLeaveDetail } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/add-leave', authmiddleware, AddLeave);
router.get('/:id',authmiddleware, getLeaveById);
router.get('/',authmiddleware, getAllLeave);
router.get('/leave-detail/:id', authmiddleware, getLeaveDetail);

export default router;