import { create } from 'zustand';
import { usersApi, modulesApi } from '../lib/api';
import type { LearningProgress, Module, UserStats } from '../types';

interface ProgressState {
  progress: LearningProgress[];
  bookmarks: Module[];
  stats: UserStats | null;
  isLoading: boolean;

  fetchProgress: () => Promise<void>;
  fetchBookmarks: () => Promise<void>;
  fetchStats: () => Promise<void>;
  toggleBookmark: (moduleId: string) => Promise<boolean>;
  updateProgress: (moduleId: string, completion: number, timeSeconds: number) => Promise<void>;
  getModuleProgress: (moduleId: string) => LearningProgress | undefined;
  isBookmarked: (moduleId: string) => boolean;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: [],
  bookmarks: [],
  stats: null,
  isLoading: false,

  fetchProgress: async () => {
    set({ isLoading: true });
    try {
      const progress = await usersApi.progress();
      set({ progress, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchBookmarks: async () => {
    try {
      const bookmarks = await usersApi.bookmarks();
      set({ bookmarks });
    } catch {
      // not authenticated or API unavailable
    }
  },

  fetchStats: async () => {
    try {
      const stats = await usersApi.stats();
      set({ stats });
    } catch {
      // not authenticated or API unavailable
    }
  },

  toggleBookmark: async (moduleId) => {
    const result = await modulesApi.bookmark(moduleId);
    if (result.bookmarked) {
      // Will be refreshed on next fetch
    } else {
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== moduleId),
      }));
    }
    await get().fetchBookmarks();
    return result.bookmarked;
  },

  updateProgress: async (moduleId, completionPercentage, timeSpentSeconds) => {
    try {
      const updated = await modulesApi.updateProgress(moduleId, {
        completionPercentage,
        timeSpentSeconds,
      });
      set((state) => ({
        progress: [
          ...state.progress.filter((p) => p.moduleId !== moduleId),
          updated,
        ],
      }));
    } catch {
      // silently fail
    }
  },

  getModuleProgress: (moduleId) => {
    return get().progress.find((p) => p.moduleId === moduleId);
  },

  isBookmarked: (moduleId) => {
    return get().bookmarks.some((b) => b.id === moduleId);
  },
}));
