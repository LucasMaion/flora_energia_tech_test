import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../../../driven/cache/datasources/redis';
import { AuthenticatedRequest } from './auth.middleware';

export type CacheKeyGenerator = (req: AuthenticatedRequest) => string;

function createCacheMiddleware(keyGenerator: CacheKeyGenerator, ttlSeconds = 300) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const start = Date.now();
            const cacheKey = keyGenerator(req);
            const cached = await redisClient.get(cacheKey);

            if (cached) {
                res.set('x-cache', 'HIT');
                res.set('x-response-time', `${Date.now() - start}ms`);
                res.json(JSON.parse(cached));
            }

            const originalJson = res.json.bind(res);
            res.json = (body) => {
                redisClient.set(cacheKey, JSON.stringify(body), 'EX', ttlSeconds);
                res.set('x-cache', 'MISS');
                res.set('x-response-time', `${Date.now() - start}ms`);
                return originalJson(body);
            };

            next();
        } catch (err) {
            console.error('Cache middleware error:', err);
            next();
        }
    };
}

export const cacheUserScoped = createCacheMiddleware((req) => {
    const userId = req.user?.id;
    return `cache:user:${userId}:${req.originalUrl}`;
});

export const cachePublic = createCacheMiddleware((req) => `cache:public:${req.originalUrl}`);
