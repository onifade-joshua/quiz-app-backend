import { Router } from 'express';
import { createQuestion, getQuestions } from '../controllers/questionController';
import { verifyUser } from '../middleware/auth';

const router = Router();

router.use(verifyUser);
router.post('/', createQuestion);
router.get('/', getQuestions);

export default router;
