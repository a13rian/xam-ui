'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/query';
import { getAccountLocations } from './locations.api';

/**
 * Query: Get account locations
 */
export function useAccountLocations(accountId: string) {
  return useQuery({
    queryKey: queryKeys.bookings.locations(accountId),
    queryFn: () => getAccountLocations(accountId),
    enabled: !!accountId,
    staleTime: 5 * 60 * 1000, // 5 minutes - locations rarely change
  });
}
