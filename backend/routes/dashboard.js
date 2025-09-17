import express from 'express';
import authmiddleware from '../middleware/authMiddleware.js';
import { getSummary } from '../controllers/summaryController.js';

const router = express.Router();

router.get('/summary', authmiddleware, getSummary);

export default router;