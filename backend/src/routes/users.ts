import { Router, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { createError } from '../middleware/errorHandler';

const router = Router();

// GET /api/users/:id
router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.params.id !== req.user!.id) {
      throw createError('Forbidden', 403);
    }
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true, email: true, username: true,
        profileType: true, country: true,
        languagePreference: true, accessibilitySettings: true,
        createdAt: true, updatedAt: true,
      },
    });
    if (!user) throw createError('User not found', 404);
    res.json(user);
  } catch (err) { next(err); }
});

// PUT /api/users/:id
router.put('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.params.id !== req.user!.id) throw createError('Forbidden', 403);
    const { username, country, languagePreference, accessibilitySettings, profileType } = req.body;

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { username, country, languagePreference, accessibilitySettings, profileType },
      select: { id: true, email: true, username: true, profileType: true, country: true },
    });
    res.json(user);
  } catch (err) { next(err); }
});

// GET /api/users/:id/progress
router.get('/:id/progress', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.params.id !== req.user!.id) throw createError('Forbidden', 403);
    const progress = await prisma.learningProgress.findMany({
      where: { userId: req.params.id },
      include: { module: { select: { id: true, title: true, type: true, slug: true } } },
    });
    res.json(progress);
  } catch (err) { next(err); }
});

// GET /api/users/:id/bookmarks
router.get('/:id/bookmarks', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.params.id !== req.user!.id) throw createError('Forbidden', 403);
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: req.params.id },
      include: { module: true },
    });
    res.json(bookmarks);
  } catch (err) { next(err); }
});

export default router;
