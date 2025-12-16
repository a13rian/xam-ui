'use client';

import { useAuthStore } from '../store';
import { useLogin, useLogout, useRefreshAuth } from '../api';

/**
 * Combined auth hook for convenient access to auth state and actions
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => !!state.user);

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const refreshAuthMutation = useRefreshAuth();

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
    login: (email: string, password: string) =>
      loginMutation.mutateAsync({ email, password }),
    logout: () => logoutMutation.mutateAsync(),
    refreshAuth: () => refreshAuthMutation.mutateAsync(),
    loginError: loginMutation.error,
    isLoginPending: loginMutation.isPending,
  };
}
