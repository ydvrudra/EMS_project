import express from 'express';
import authmiddleware from '../middleware/authMiddleware.js';
import { AddSalary,getSalaryById } from '../controllers/salaryController.js';

const router = express.Router();

router.post('/add-salary', authmiddleware, AddSalary);
router.get('/:id/:role', authmiddleware, getSalaryById);

export default router;