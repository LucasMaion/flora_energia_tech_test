import { Router } from 'express';
import { favoriteHandler, searchWordsHandler, unfavoriteHandler, wordDetailsHandler } from '../handlers';
import { authMiddleware } from '../middlewares/auth.middleware';
import { cachePublic, cacheUserScoped } from '../middlewares/cache.middleware';
import { errorMiddleware } from '../middlewares/error.middleware';
const router = Router();

router.get('/en', authMiddleware, cachePublic, searchWordsHandler, errorMiddleware);
router.get('/en/:word', authMiddleware, cacheUserScoped, wordDetailsHandler, errorMiddleware);
router.post('/en/:word/favorite', authMiddleware, cacheUserScoped, favoriteHandler, errorMiddleware);
router.delete('/en/:word/unfavorite', authMiddleware, cacheUserScoped, unfavoriteHandler, errorMiddleware);

export default router;
