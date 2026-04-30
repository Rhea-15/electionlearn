// ── User & Auth ───────────────────────────────────────────────────────────────
export type ProfileType = 'first_time_voter' | 'student' | 'educator' | 'general';

export interface User {
  id: string;
  email: string;
  username: string;
  profileType: ProfileType;
  country?: string;
  languagePreference: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

// ── Modules ───────────────────────────────────────────────────────────────────
export type ModuleType = 'timeline' | 'process' | 'quiz' | 'faq';

export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: ModuleType;
  difficultyLevel: number;
  durationMinutes: number;
  content: Record<string, unknown>;
  tags: string[];
  orderIndex: number;
  quizzes?: Quiz[];
}

export interface LearningProgress {
  moduleId: string;
  completionPercentage: number;
  startedAt: string;
  completedAt?: string;
  timeSpentSeconds: number;
}

// ── Timeline ──────────────────────────────────────────────────────────────────
export type EventType = 'registration' | 'campaign' | 'voting' | 'counting' | 'results';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  eventType: EventType;
  importanceLevel: number;
  country: string;
  color?: string;
  icon?: string;
}

// ── Quizzes ───────────────────────────────────────────────────────────────────
export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionType: string;
  options: QuizOption[];
  explanation?: string;
  orderIndex: number;
}

export interface Quiz {
  id: string;
  moduleId?: string;
  title: string;
  description: string;
  passingScore: number;
  timeLimit?: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  responses: Array<{
    questionId: string;
    isCorrect: boolean;
    explanation?: string;
  }>;
}

// ── FAQ & Glossary ────────────────────────────────────────────────────────────
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  orderIndex: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example?: string;
  category?: string;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export interface UserStats {
  modulesStarted: number;
  modulesCompleted: number;
  quizzesTaken: number;
  quizzesPassed: number;
  totalTimeMinutes: number;
  averageScore: number;
  currentStreak: number;
  streakDays: number;
  overallProgress: number;
}
