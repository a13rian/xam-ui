// Query keys factory for TanStack Query
// This provides type-safe, centralized query key management

export interface SearchFilters {
  location?: string;
  date?: string;
  services?: string[];
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  page?: number;
  limit?: number;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  // Companions
  companions: {
    all: ['companions'] as const,
    list: (filters?: SearchFilters) =>
      [...queryKeys.companions.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.companions.all, 'detail', id] as const,
  },

  // Wallet
  wallet: {
    all: ['wallet'] as const,
    info: () => [...queryKeys.wallet.all, 'info'] as const,
    balance: () => [...queryKeys.wallet.all, 'balance'] as const,
    transactions: (page: number, limit: number) =>
      [...queryKeys.wallet.all, 'transactions', { page, limit }] as const,
  },

  // Bookings
  bookings: {
    all: ['bookings'] as const,
    list: (params: { page?: number; limit?: number; status?: BookingStatus }) =>
      [...queryKeys.bookings.all, 'list', params] as const,
    detail: (id: string) => [...queryKeys.bookings.all, 'detail', id] as const,
  },

  // Favorites
  favorites: {
    all: ['favorites'] as const,
    list: () => [...queryKeys.favorites.all, 'list'] as const,
  },

  // Profile
  profile: {
    all: ['profile'] as const,
    notifications: () => [...queryKeys.profile.all, 'notifications'] as const,
    verificationStatus: () =>
      [...queryKeys.profile.all, 'verification-status'] as const,
  },

  // Partner / Account
  partner: {
    all: ['partner'] as const,
    account: () => [...queryKeys.partner.all, 'account'] as const,
  },
} as const;
