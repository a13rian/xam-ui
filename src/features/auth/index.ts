// Types
export type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  TokenResponse,
  UpdateUserRequest,
  AvatarResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from './types';

// Store
export {
  useAuthStore,
  useUser,
  useIsAuthenticated,
  useIsAuthLoading,
  useIsAuthHydrated,
} from './store';

// Utils
export {
  setTokens,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  removeTokens,
  isAuthenticated,
  initializeTokenStorage,
} from './utils';

// API
export {
  login,
  register,
  logout,
  getMe,
  refreshToken,
  updateUser,
  uploadAvatar,
  removeAvatar,
  forgotPassword,
  resetPassword,
  useCurrentUser,
  useLogin,
  useRegister,
  useLogout,
  useRefreshAuth,
} from './api';

// Hooks
export { useAuth } from './hooks';
