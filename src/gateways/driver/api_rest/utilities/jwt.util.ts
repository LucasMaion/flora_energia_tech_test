import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRATION = '60m';

interface UserPayload {
    id: number;
    name: string;
}

export function generateToken(payload: UserPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

export function verifyToken(token: string): UserPayload {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
}
