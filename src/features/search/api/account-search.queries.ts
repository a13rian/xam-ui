import { useQuery } from '@tanstack/react-query';
import { searchAccounts } from './account-search.api';
import type { AccountSearchParams } from './account-search.types';

/**
 * Query keys for account search
 */
export const accountSearchKeys = {
  all: ['account-search'] as const,
  search: (params: AccountSearchParams) =>
    [...accountSearchKeys.all, 'results', params] as const,
};

/**
 * Hook to search accounts by geolocation
 *
 * @param params - Search parameters (requires latitude and longitude)
 * @returns React Query result with account search data
 *
 * @example
 * const { data, isLoading, error } = useAccountSearch({
 *   latitude: 10.7769,
 *   longitude: 106.7009,
 *   radiusKm: 10,
 * });
 */
export function useAccountSearch(params: AccountSearchParams | null) {
  return useQuery({
    queryKey: params ? accountSearchKeys.search(params) : accountSearchKeys.all,
    queryFn: () => {
      if (!params) throw new Error('Search params are required');
      return searchAccounts(params);
    },
    enabled: params !== null,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
