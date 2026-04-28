import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';

const router = Router();

// GET /api/timeline/events
router.get('/events', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { country, type, importance } = req.query;
    const where: any = {};
    if (country) where.country = country;
    if (type) where.eventType = type;
    if (importance) where.importanceLevel = { gte: parseInt(importance as string) };

    const events = await prisma.timelineEvent.findMany({
      where,
      orderBy: { eventDate: 'asc' },
    });
    res.json(events);
  } catch (err) { next(err); }
});

// GET /api/timeline/events/:id
router.get('/events/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await prisma.timelineEvent.findUnique({ where: { id: req.params.id } });
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    res.json(event);
  } catch (err) { next(err); }
});

export default router;
