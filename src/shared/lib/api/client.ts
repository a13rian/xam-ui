import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiError } from '@/shared/types';

// Extended config with custom options
interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipRefresh?: boolean;
}

interface InternalApiRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
  skipRefresh?: boolean;
  _retry?: boolean;
}

// Token storage functions - dependency injection pattern
let getAccessToken: () => string | null = () => null;
let getRefreshToken: () => string | null = () => null;
let setTokens: (
  access: string,
  refresh: string,
  expiresIn: number
) => void = () => {};
let removeTokens: () => void = () => {};

// Allow features to inject their token storage implementation
export function setTokenStorage(storage: {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setTokens: (access: string, refresh: string, expiresIn: number) => void;
  removeTokens: () => void;
}) {
  getAccessToken = storage.getAccessToken;
  getRefreshToken = storage.getRefreshToken;
  setTokens = storage.setTokens;
  removeTokens = storage.removeTokens;
}

// Refresh state management
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Create axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalApiRequestConfig) => {
    // Handle FormData - let axios set Content-Type with proper boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // Skip auth for public endpoints
    if (config.skipAuth) {
      return config;
    }

    // Inject authorization token
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalApiRequestConfig;

    // Skip refresh for specific requests or non-401 errors
    if (
      error.response?.status !== 401 ||
      originalRequest?.skipAuth ||
      originalRequest?.skipRefresh ||
      originalRequest?._retry
    ) {
      // Transform error to match existing ApiError interface
      const apiError: ApiError = {
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'An error occurred',
        statusCode: error.response?.status || 500,
      };
      return Promise.reject(apiError);
    }

    // Queue request if refresh already in progress
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshTokenValue = getRefreshToken();

      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      // Call refresh endpoint directly to avoid interceptor loops
      const response = await axios.post(
        `${axiosInstance.defaults.baseURL}/auth/refresh`,
        { refreshToken: refreshTokenValue },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn,
      } = response.data;
      setTokens(accessToken, newRefreshToken, expiresIn);

      processQueue(null, accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as Error);
      removeTokens();

      const apiError: ApiError = {
        message: 'Authentication failed. Please login again.',
        statusCode: 401,
      };
      return Promise.reject(apiError);
    } finally {
      isRefreshing = false;
    }
  }
);

// Typed API wrapper
export const api = {
  get: <T>(url: string, config?: ApiRequestConfig): Promise<T> =>
    axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> =>
    axiosInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> =>
    axiosInstance.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> =>
    axiosInstance.patch<T>(url, data, config).then((res) => res.data),

  del: <T>(url: string, config?: ApiRequestConfig): Promise<T> =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),
};

// Backward compatibility exports
export const get = api.get;
export const post = api.post;
export const put = api.put;
export const patch = api.patch;
export const del = api.del;
