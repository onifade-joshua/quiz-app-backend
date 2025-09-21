import { Router } from 'express';
import { startQuiz, submitQuiz } from '../controllers/quizController';
import { verifyUser } from '../middleware/auth';

const router = Router();

router.get('/start', verifyUser, startQuiz);
router.post('/submit', verifyUser, submitQuiz);

export default router;
