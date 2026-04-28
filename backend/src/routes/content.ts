import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';

const router = Router();

// GET /api/faq
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const where: any = { isPublished: true };
    if (category) where.category = category;

    const items = await prisma.faqItem.findMany({
      where,
      orderBy: [{ category: 'asc' }, { orderIndex: 'asc' }],
    });
    res.json(items);
  } catch (err) { next(err); }
});

// GET /api/glossary
router.get('/glossary', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const terms = await prisma.glossaryTerm.findMany({ orderBy: { term: 'asc' } });
    res.json(terms);
  } catch (err) { next(err); }
});

// GET /api/search
router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      res.json({ modules: [], faq: [], glossary: [], events: [] });
      return;
    }

    const term = q.toLowerCase();

    const [modules, faq, glossary, events] = await Promise.all([
      prisma.module.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: term, mode: 'insensitive' } },
            { description: { contains: term, mode: 'insensitive' } },
          ],
        },
        select: { id: true, title: true, slug: true, description: true, type: true },
        take: 5,
      }),
      prisma.faqItem.findMany({
        where: {
          isPublished: true,
          OR: [
            { question: { contains: term, mode: 'insensitive' } },
            { answer: { contains: term, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),
      prisma.glossaryTerm.findMany({
        where: {
          OR: [
            { term: { contains: term, mode: 'insensitive' } },
            { definition: { contains: term, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),
      prisma.timelineEvent.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: 'insensitive' } },
            { description: { contains: term, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),
    ]);

    res.json({ modules, faq, glossary, events });
  } catch (err) { next(err); }
});

export default router;
