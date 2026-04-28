import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../config/database';

export interface AuthRequest extends Request {
  user?: { id: string; email: string; username: string };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as {
      userId: string;
      email: string;
      username: string;
    };

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    req.user = { id: user.id, email: user.email, username: user.username };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(' ')[1];

    if (token) {
      const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as {
        userId: string;
        email: string;
        username: string;
      };
      req.user = { id: payload.userId, email: payload.email, username: payload.username };
    }
  } catch {
    // optional — no error
  }
  next();
};
