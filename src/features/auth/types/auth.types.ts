// ============================================
// Auth Types
// ============================================

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
  avatarUrl?: string | null;
  roleIds?: string[];
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type RegisterResponse = LoginResponse;

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
}

export interface AvatarResponse {
  avatarUrl: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
