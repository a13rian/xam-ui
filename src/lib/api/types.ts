// API base type definitions

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Authentication related types
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleIds: string[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface MessageResponse {
  message: string;
}

export interface GetMeResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleIds: string[];
}

