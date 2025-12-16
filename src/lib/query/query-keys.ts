import type { SearchFilters } from '@/types/companion';
import type { BookingStatus } from '@/types/api';

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
} as const;
