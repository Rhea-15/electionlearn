import axios from 'axios';
import type {
  AuthResponse, User, Module, TimelineEvent,
  Quiz, QuizResult, FaqItem, GlossaryTerm,
  LearningProgress, UserStats,
} from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Auto-refresh interceptor
let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => error ? reject(error) : resolve(null));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(original)).catch((e) => Promise.reject(e));
      }
      original._retry = true;
      isRefreshing = true;
      try {
        await api.post('/api/auth/refresh');
        processQueue(null);
        return api(original);
      } catch (refreshErr) {
        processQueue(refreshErr);
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data: { email: string; password: string; username: string; profileType?: string }) =>
    api.post<AuthResponse>('/api/auth/register', data).then((r) => r.data),
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/api/auth/login', data).then((r) => r.data),
  logout: () => api.post('/api/auth/logout'),
  me: () => api.get<{ user: User }>('/api/auth/me').then((r) => r.data.user),
};

// ── Modules ───────────────────────────────────────────────────────────────────
export const modulesApi = {
  list: (params?: { type?: string; difficulty?: number }) =>
    api.get<Module[]>('/api/modules', { params }).then((r) => r.data),
  get: (id: string) =>
    api.get<Module>(`/api/modules/${id}`).then((r) => r.data),
  bookmark: (id: string) =>
    api.post<{ bookmarked: boolean }>(`/api/modules/${id}/bookmark`).then((r) => r.data),
  updateProgress: (id: string, data: { completionPercentage: number; timeSpentSeconds: number }) =>
    api.put<LearningProgress>(`/api/modules/${id}/progress`, data).then((r) => r.data),
};

// ── Timeline ──────────────────────────────────────────────────────────────────
export const timelineApi = {
  list: (params?: { country?: string; type?: string; year?: number }) =>
    api.get<TimelineEvent[]>('/api/timeline', { params }).then((r) => r.data),
};

// ── Quizzes ───────────────────────────────────────────────────────────────────
export const quizzesApi = {
  list: () => api.get<Quiz[]>('/api/quizzes').then((r) => r.data),
  get: (id: string) => api.get<Quiz>(`/api/quizzes/${id}`).then((r) => r.data),
  submit: (id: string, answers: Record<string, string>) =>
    api.post<QuizResult>(`/api/quizzes/${id}/submit`, { answers }).then((r) => r.data),
};

// ── Content (FAQ + Glossary) ──────────────────────────────────────────────────
export const contentApi = {
  faq: (params?: { category?: string; search?: string }) =>
    api.get<FaqItem[]>('/api/faq', { params }).then((r) => r.data),
  glossary: (params?: { category?: string; search?: string }) =>
    api.get<GlossaryTerm[]>('/api/glossary', { params }).then((r) => r.data),
  search: (q: string) =>
    api.get<{ modules: Module[]; faq: FaqItem[]; glossary: GlossaryTerm[] }>('/api/search', { params: { q } }).then((r) => r.data),
};

// ── Users ─────────────────────────────────────────────────────────────────────
export const usersApi = {
  stats: () => api.get<UserStats>('/api/users/me/stats').then((r) => r.data),
  progress: () => api.get<LearningProgress[]>('/api/users/me/progress').then((r) => r.data),
  bookmarks: () => api.get<Module[]>('/api/users/me/bookmarks').then((r) => r.data),
  update: (data: Partial<User>) => api.put<User>('/api/users/me', data).then((r) => r.data),
};
