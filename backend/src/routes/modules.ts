import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { createError } from '../middleware/errorHandler';

const router = Router();

// GET /api/modules
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, difficulty } = req.query;
    const where: any = { isPublished: true };
    if (type) where.type = type;
    if (difficulty) where.difficultyLevel = parseInt(difficulty as string);

    const modules = await prisma.module.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true, title: true, slug: true, description: true,
        type: true, difficultyLevel: true, durationMinutes: true,
        tags: true, orderIndex: true,
      },
    });
    res.json(modules);
  } catch (err) { next(err); }
});

// GET /api/modules/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const module = await prisma.module.findFirst({
      where: { OR: [{ id: req.params.id }, { slug: req.params.id }], isPublished: true },
      include: { quizzes: { select: { id: true, title: true, passingScore: true, timeLimit: true } } },
    });
    if (!module) throw createError('Module not found', 404);
    res.json(module);
  } catch (err) { next(err); }
});

// POST /api/modules/:id/bookmark
router.post('/:id/bookmark', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const existing = await prisma.bookmark.findUnique({
      where: { userId_moduleId: { userId: req.user!.id, moduleId: req.params.id } },
    });

    if (existing) {
      await prisma.bookmark.delete({ where: { id: existing.id } });
      res.json({ bookmarked: false });
    } else {
      await prisma.bookmark.create({ data: { userId: req.user!.id, moduleId: req.params.id } });
      res.json({ bookmarked: true });
    }
  } catch (err) { next(err); }
});

// PUT /api/modules/:id/progress
router.put('/:id/progress', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { completionPercentage, timeSpentSeconds } = req.body;
    const progress = await prisma.learningProgress.upsert({
      where: { userId_moduleId: { userId: req.user!.id, moduleId: req.params.id } },
      create: {
        userId: req.user!.id, moduleId: req.params.id,
        completionPercentage: completionPercentage || 0,
        timeSpentSeconds: timeSpentSeconds || 0,
        completedAt: completionPercentage >= 100 ? new Date() : null,
      },
      update: {
        completionPercentage: completionPercentage || 0,
        timeSpentSeconds: timeSpentSeconds || 0,
        completedAt: completionPercentage >= 100 ? new Date() : undefined,
      },
    });
    res.json(progress);
  } catch (err) { next(err); }
});

export default router;
