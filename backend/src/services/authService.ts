import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../config/database';
import { env } from '../config/env';
import { createError } from '../middleware/errorHandler';

const SALT_ROUNDS = 12;

export const generateTokens = (userId: string, email: string, username: string) => {
  const accessToken = jwt.sign(
    { userId, email, username },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );

  const refreshToken = jwt.sign(
    { userId, jti: uuidv4() },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );

  return { accessToken, refreshToken };
};

export const authService = {
  async register(email: string, password: string, username: string, profileType?: string) {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      throw createError('Email or username already taken', 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        profileType: (profileType as any) || 'general',
      },
      select: { id: true, email: true, username: true, profileType: true, createdAt: true },
    });

    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.username);

    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { user, accessToken, refreshToken };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw createError('Invalid credentials', 401);

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw createError('Invalid credentials', 401);

    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.username);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
  },

  async refresh(refreshToken: string) {
    let payload: { userId: string };
    try {
      payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { userId: string };
    } catch {
      throw createError('Invalid refresh token', 401);
    }

    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored || stored.expiresAt < new Date()) {
      throw createError('Refresh token expired', 401);
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) throw createError('User not found', 404);

    // Rotate refresh token
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    const tokens = generateTokens(user.id, user.email, user.username);

    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return tokens;
  },

  async logout(refreshToken: string) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  },
};
