import type { ApiError } from './types';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
} from '../auth/token-storage';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
  skipRefresh?: boolean;
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Refresh access token
 */
async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      setTokens(data.accessToken, data.refreshToken, data.expiresIn);
      return data.accessToken;
    } catch {
      removeTokens();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * API client request function
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { skipAuth = false, skipRefresh = false, ...fetchOptions } = options;

  // Build full URL
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Add authentication token
  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  // Send request
  let response = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: 'include',
  });

  // Handle 401 error - try to refresh token
  if (response.status === 401 && !skipAuth && !skipRefresh) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Retry request with new token
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: 'include',
      });
    } else {
      // Refresh failed, clear token and throw error
      removeTokens();
      throw new Error('Authentication failed. Please login again.');
    }
  }

  // Handle error response
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData: ApiError = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    const error: ApiError = {
      message: errorMessage,
      statusCode: response.status,
    };

    throw error;
  }

  // Handle empty response
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return {} as T;
  }

  return response.json();
}

/**
 * GET request
 */
export function get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST request
 */
export function post<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export function put<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export function del<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, { ...options, method: 'DELETE' });
}
