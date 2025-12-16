import { post, get } from './client';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  MessageResponse,
  GetMeResponse,
} from './types';

/**
 * Register
 */
export async function register(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  return post<RegisterResponse>('/auth/register', data, { skipAuth: true });
}

/**
 * Login
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  return post<LoginResponse>('/auth/login', data, { skipAuth: true });
}

/**
 * Refresh token
 */
export async function refreshToken(
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  return post<RefreshTokenResponse>('/auth/refresh', data, {
    skipAuth: true,
    skipRefresh: true,
  });
}

/**
 * Forgot password
 */
export async function forgotPassword(
  data: ForgotPasswordRequest,
): Promise<MessageResponse> {
  return post<MessageResponse>('/auth/forgot-password', data, {
    skipAuth: true,
  });
}

/**
 * Reset password
 */
export async function resetPassword(
  data: ResetPasswordRequest,
): Promise<MessageResponse> {
  return post<MessageResponse>('/auth/reset-password', data, {
    skipAuth: true,
  });
}

/**
 * Verify email
 */
export async function verifyEmail(
  data: VerifyEmailRequest,
): Promise<MessageResponse> {
  return post<MessageResponse>('/auth/verify-email', data, { skipAuth: true });
}

/**
 * Get current user information
 */
export async function getMe(): Promise<GetMeResponse> {
  return get<GetMeResponse>('/auth/me');
}

/**
 * Logout
 */
export async function logout(refreshToken?: string): Promise<MessageResponse> {
  return post<MessageResponse>(
    '/auth/logout',
    refreshToken ? { refreshToken } : undefined,
  );
}

