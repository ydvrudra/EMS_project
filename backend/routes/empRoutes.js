import express from 'express';
import { addEmployee,getEmployees, getEmployeebyId,UpdateEmployeebyId ,fetchEmployeesByDeptId} from '../controllers/empController.js';
import authmiddleware from '../middleware/authMiddleware.js';
import  upload from '../middleware/uploads.js';

const router = express.Router();

router.post('/add-employee', authmiddleware, upload.single('image'), addEmployee);
router.get('/', authmiddleware, getEmployees);
router.get('/:id', authmiddleware, getEmployeebyId);
router.put('/:id', authmiddleware, upload.single('image'), UpdateEmployeebyId);
router.get('/department/:id', authmiddleware, fetchEmployeesByDeptId);

export default router;