import express from 'express';
import authmiddleware from '../middleware/authMiddleware.js';
import { AddSalary,getSalaryById } from '../controllers/salaryController.js';

const router = express.Router();

router.post('/add-salary', authmiddleware, AddSalary);
//router.get('/', authmiddleware, getEmployees);
router.get('/:id', authmiddleware, getSalaryById);
//router.put('/:id', authmiddleware, upload.single('image'), UpdateEmployeebyId);
//router.get('/department/:id', authmiddleware, fetchEmployeesByDeptId);

export default router;