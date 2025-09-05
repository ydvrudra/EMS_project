import express from 'express';
import { addEmployee, upload } from '../controllers/empController.js';
import authmiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-employee', authmiddleware, upload.single('image'), addEmployee);
//router.get('/', authmiddleware, getDepartments);
//router.get('/:id', authmiddleware, getDepartmentbyId);
//router.put('/:id', authmiddleware, UpdateDepartmentbyId);
//router.delete('/:id', authmiddleware, deleteDepartmentbyId);

export default router;