'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthUser } from '@/features/auth';

interface AuthState {
  // State
  user: AuthUser | null;
  isLoading: boolean;
  isHydrated: boolean;

  // Actions
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setHydrated: (isHydrated: boolean) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  isLoading: true,
  isHydrated: false,
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setUser: (user) =>
          set({ user }, false, 'auth/setUser'),

        setLoading: (isLoading) =>
          set({ isLoading }, false, 'auth/setLoading'),

        setHydrated: (isHydrated) =>
          set({ isHydrated }, false, 'auth/setHydrated'),

        reset: () =>
          set(
            { ...initialState, isLoading: false, isHydrated: true },
            false,
            'auth/reset'
          ),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user }),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      }
    ),
    { name: 'AuthStore' }
  )
);

// Selector hooks for optimized re-renders
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user);
export const useIsAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useIsAuthHydrated = () => useAuthStore((state) => state.isHydrated);
