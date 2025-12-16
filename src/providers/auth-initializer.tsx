'use client';

import { useEffect } from 'react';
import {
  useAuthStore,
  useCurrentUser,
  isAuthenticated,
  initializeTokenStorage,
} from '@/features/auth';

// Initialize token storage immediately when module loads
// This ensures the API client has access to tokens before any requests
initializeTokenStorage();

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { setLoading, setUser, isHydrated } = useAuthStore();
  const { data: user, isLoading: isQueryLoading, isSuccess } = useCurrentUser();

  useEffect(() => {
    // If no token, set loading to false immediately
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }
  }, [setLoading]);

  // Sync query result with store
  useEffect(() => {
    if (isSuccess && user) {
      setUser(user);
      setLoading(false);
    } else if (isSuccess && !user) {
      setUser(null);
      setLoading(false);
    }
  }, [isSuccess, user, setUser, setLoading]);

  // Set loading to false when query finishes (even on error)
  useEffect(() => {
    if (!isQueryLoading && isAuthenticated()) {
      setLoading(false);
    }
  }, [isQueryLoading, setLoading]);

  // Wait for hydration before rendering to avoid hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}
