import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utilities/jwt.util';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        name: string;
    };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader?.split(' ')[1];

    try {
        const decoded = verifyToken(token || "");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}
