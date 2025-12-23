'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/query';
import { getAccountServices } from './services.api';

/**
 * Query: Get account services
 */
export function useAccountServices(accountId: string) {
  return useQuery({
    queryKey: queryKeys.bookings.services(accountId),
    queryFn: () => getAccountServices(accountId),
    enabled: !!accountId,
    staleTime: 5 * 60 * 1000, // 5 minutes - services rarely change
  });
}
