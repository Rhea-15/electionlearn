import { create } from 'zustand';
import { authApi } from '../lib/api';
import type { User, ProfileType } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    username: string;
    profileType?: ProfileType;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = await authApi.login({ email, password });
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      const axiosErr = err as { response?: { data?: { error?: string } } };
      set({
        error: axiosErr.response?.data?.error || msg,
        isLoading: false,
      });
      throw err;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = await authApi.register(data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      set({
        error: axiosErr.response?.data?.error || 'Registration failed',
        isLoading: false,
      });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await authApi.me();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
