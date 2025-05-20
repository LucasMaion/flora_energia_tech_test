import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import entriesRoutes from './entries.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'English Dictionary' });
});


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/entries', entriesRoutes);

export default router;
