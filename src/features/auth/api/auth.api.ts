import { get, post, patch, del } from '@/shared/lib/api';
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  TokenResponse,
  UpdateUserRequest,
  AvatarResponse,
} from '../types';

/**
 * Login with email and password
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  return post<LoginResponse>('/auth/login', credentials, { skipAuth: true });
}

/**
 * Register a new account
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  return post<RegisterResponse>('/auth/register', data, { skipAuth: true });
}

/**
 * Logout (invalidate refresh token)
 */
export async function logout(refreshToken: string): Promise<void> {
  return post('/auth/logout', { refreshToken });
}

/**
 * Get current user info
 */
export async function getMe(): Promise<AuthUser> {
  return get<AuthUser>('/auth/me');
}

/**
 * Refresh access token
 */
export async function refreshToken(
  data: RefreshTokenRequest
): Promise<TokenResponse> {
  return post<TokenResponse>('/auth/refresh', data, { skipAuth: true, skipRefresh: true });
}

/**
 * Update user profile
 */
export async function updateUser(data: UpdateUserRequest): Promise<AuthUser> {
  return patch<AuthUser>('/auth/me', data);
}

/**
 * Upload avatar
 */
export async function uploadAvatar(file: File): Promise<AvatarResponse> {
  const formData = new FormData();
  formData.append('avatar', file);

  return post<AvatarResponse>('/auth/me/avatar', formData);
}

/**
 * Remove avatar
 */
export async function removeAvatar(): Promise<void> {
  return del('/auth/me/avatar');
}

/**
 * Forgot password
 */
export async function forgotPassword(data: { email: string }): Promise<void> {
  return post('/auth/forgot-password', data, { skipAuth: true });
}

/**
 * Reset password
 */
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  return post('/auth/reset-password', { token, newPassword }, { skipAuth: true });
}
