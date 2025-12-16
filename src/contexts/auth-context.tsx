'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthUser } from '@/lib/api/types';
import { login as loginApi, logout as logoutApi, getMe } from '@/lib/api/auth';
import {
  setTokens,
  removeTokens,
  isAuthenticated,
  getRefreshToken,
} from '@/lib/auth/token-storage';
import { refreshToken } from '@/lib/api/auth';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on initialization
  useEffect(() => {
    const initAuth = async () => {
      if (isAuthenticated()) {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (error) {
          // If getting user info fails, clear token
          removeTokens();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi({ email, password });
      setTokens(response.accessToken, response.refreshToken, response.expiresIn);
      setUser(response.user);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      const refreshTokenValue = getRefreshToken();
      if (refreshTokenValue) {
        await logoutApi(refreshTokenValue);
      }
    } catch (error) {
      // Even if logout API fails, clear local state
      console.error('Logout error:', error);
    } finally {
      removeTokens();
      setUser(null);
      router.push('/');
    }
  };

  // Refresh authentication status
  const refreshAuth = async () => {
    if (!isAuthenticated()) {
      setUser(null);
      return;
    }

    try {
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      // If getting user info fails, try to refresh token
      const refreshTokenValue = getRefreshToken();
      if (refreshTokenValue) {
        try {
          const response = await refreshToken({ refreshToken: refreshTokenValue });
          setTokens(response.accessToken, response.refreshToken, response.expiresIn);
          const userData = await getMe();
          setUser(userData);
        } catch (refreshError) {
          // Refresh failed, clear token
          removeTokens();
          setUser(null);
        }
      } else {
        removeTokens();
        setUser(null);
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

