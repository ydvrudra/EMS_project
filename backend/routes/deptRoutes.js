import express from 'express';
import { addDepartment, getDepartments, getDepartmentbyId, UpdateDepartmentbyId, deleteDepartmentbyId} from '../controllers/deptController.js';
import authmiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-department', authmiddleware, addDepartment);
router.get('/', authmiddleware, getDepartments);
router.get('/:id', authmiddleware, getDepartmentbyId);
router.put('/:id', authmiddleware, UpdateDepartmentbyId);
router.delete('/:id', authmiddleware, deleteDepartmentbyId);

export default router;