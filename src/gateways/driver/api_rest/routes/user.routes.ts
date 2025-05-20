import { Router } from 'express';
import { favoritesHandler, historyHandler, meHandler } from '../handlers';
import { authMiddleware } from '../middlewares/auth.middleware';
import { cacheUserScoped } from '../middlewares/cache.middleware';
import { errorMiddleware } from '../middlewares/error.middleware';
const router = Router();

router.get('/me', authMiddleware, cacheUserScoped, meHandler, errorMiddleware);
router.get('/me/history', authMiddleware, cacheUserScoped, historyHandler, errorMiddleware);
router.get('/me/favorites', authMiddleware, cacheUserScoped, favoritesHandler, errorMiddleware);

export default router;
