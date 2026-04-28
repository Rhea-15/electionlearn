import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { createError } from '../middleware/errorHandler';

const router = Router();

// GET /api/quizzes/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: {
        questions: { orderBy: { orderIndex: 'asc' } },
      },
    });
    if (!quiz) throw createError('Quiz not found', 404);

    // Hide correct answers from questions in the response
    const safeQuiz = {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: (q.options as any[]).map(({ id, text }) => ({ id, text })),
      })),
    };
    res.json(safeQuiz);
  } catch (err) { next(err); }
});

// POST /api/quizzes/:id/submit
router.post('/:id/submit', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: { questions: true },
    });
    if (!quiz) throw createError('Quiz not found', 404);

    const { answers, attemptNumber = 1 } = req.body;
    // answers: Array<{ questionId: string, answerId: string }>

    let correct = 0;
    const results = [];

    for (const answer of answers) {
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      if (!question) continue;

      const correctOption = (question.options as any[]).find((o) => o.isCorrect);
      const isCorrect = correctOption?.id === answer.answerId;
      if (isCorrect) correct++;

      await prisma.quizResponse.create({
        data: {
          userId: req.user!.id,
          quizId: quiz.id,
          questionId: question.id,
          userAnswer: answer.answerId,
          isCorrect,
          score: isCorrect ? 1 : 0,
          attemptNumber,
        },
      });

      results.push({
        questionId: question.id,
        isCorrect,
        correctAnswerId: correctOption?.id,
        explanation: question.explanation,
      });
    }

    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    res.json({
      score,
      passed,
      correct,
      total: quiz.questions.length,
      passingScore: quiz.passingScore,
      results,
    });
  } catch (err) { next(err); }
});

// GET /api/quizzes/:id/results/:userId
router.get('/:id/results/:userId', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.params.userId !== req.user!.id) throw createError('Forbidden', 403);

    const responses = await prisma.quizResponse.findMany({
      where: { quizId: req.params.id, userId: req.params.userId },
      orderBy: { submittedAt: 'desc' },
    });
    res.json(responses);
  } catch (err) { next(err); }
});

export default router;
