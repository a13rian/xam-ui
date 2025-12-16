'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store';
import { queryKeys } from '@/shared/lib/query';
import {
  login as loginApi,
  logout as logoutApi,
  getMe,
  register as registerApi,
} from './auth.api';
import {
  setTokens,
  removeTokens,
  isAuthenticated as checkAuth,
  getRefreshToken,
} from '../utils';
import type { LoginRequest, RegisterRequest, AuthUser } from '../types';

/**
 * Query: Get current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async (): Promise<AuthUser | null> => {
      if (!checkAuth()) {
        return null;
      }
      const user = await getMe();
      return user;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: false,
    enabled: checkAuth(),
  });
}

/**
 * Mutation: Login
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      setLoading(true);
      const response = await loginApi(credentials);
      return response;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken, data.expiresIn);
      setUser(data.user);
      setLoading(false);
      queryClient.setQueryData(queryKeys.auth.me(), data.user);
      router.push('/');
    },
    onError: () => {
      setLoading(false);
    },
  });
}

/**
 * Mutation: Register
 */
export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      setLoading(true);
      const response = await registerApi(data);
      return response;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken, data.expiresIn);
      setUser(data.user);
      setLoading(false);
      queryClient.setQueryData(queryKeys.auth.me(), data.user);
      router.push('/');
    },
    onError: () => {
      setLoading(false);
    },
  });
}

/**
 * Mutation: Logout
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { reset } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          await logoutApi(refreshToken);
        } catch {
          // Continue with logout even if API fails
        }
      }
    },
    onSettled: () => {
      removeTokens();
      reset();
      queryClient.clear();
      router.push('/');
    },
  });
}

/**
 * Mutation: Refresh auth (re-fetch current user)
 */
export function useRefreshAuth() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (!checkAuth()) {
        return null;
      }
      const user = await getMe();
      return user;
    },
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(queryKeys.auth.me(), user);
    },
    onError: () => {
      setUser(null);
      removeTokens();
    },
  });
}
