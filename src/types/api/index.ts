// ============================================
// Common API Types
// ============================================

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// ============================================
// Auth Types
// ============================================

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  roleIds?: string[];
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
}

export interface AvatarResponse {
  avatarUrl: string;
}

// ============================================
// Wallet Types
// ============================================

export interface WalletResponse {
  id: string;
  currency: string;
  createdAt: string;
}

export interface BalanceResponse {
  balance: number;
  currency: string;
}

export type TransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'payment'
  | 'refund'
  | 'adjustment';

export interface TransactionResponse {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
  balanceAfter: number;
}

export interface TransactionListResponse {
  transactions: TransactionResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DepositRequest {
  amount: number;
  description?: string;
}

export interface DepositResponse {
  transaction: TransactionResponse;
  newBalance: number;
}

// ============================================
// Booking Types
// ============================================

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface BookingService {
  id: string;
  serviceName: string;
  price: number;
  duration: number;
}

export interface BookingResponse {
  id: string;
  status: BookingStatus;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  customerAddress?: string;
  totalAmount: number;
  currency: string;
  services: BookingService[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingsListResponse {
  items: BookingResponse[];
  total: number;
  limit: number;
}

export interface ListBookingsQuery {
  page?: number;
  limit?: number;
  status?: BookingStatus;
}

// ============================================
// Companion Types (API responses)
// ============================================

export interface CompanionsListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
