import { Router } from 'express';
import { signInHandler, signUpHandler } from '../handlers';
import { errorMiddleware } from '../middlewares/error.middleware';
const router = Router();

router.post('/signup', signUpHandler, errorMiddleware);
router.post('/signin', signInHandler, errorMiddleware);

export default router;
