'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query';
import { get } from '@/lib/api/client';
import type { Companion, SearchFilters } from '@/types/companion';
import { useSearchFilters } from '@/stores/search-ui.store';

interface CompanionsResponse {
  items: Companion[];
  total: number;
  page: number;
  limit: number;
}

/**
 * API function for fetching companions
 */
async function fetchCompanions(filters: SearchFilters): Promise<Companion[]> {
  const params = new URLSearchParams();

  if (filters.location) {
    params.append('location', filters.location);
  }
  if (filters.dateFrom) {
    params.append('dateFrom', filters.dateFrom.toISOString());
  }
  if (filters.dateTo) {
    params.append('dateTo', filters.dateTo.toISOString());
  }
  if (filters.guests > 0) {
    params.append('guests', filters.guests.toString());
  }

  const queryString = params.toString();
  const response = await get<CompanionsResponse>(
    `/companions${queryString ? `?${queryString}` : ''}`,
    { skipAuth: true }
  );

  return response.items;
}

/**
 * Query: Get companions with filters
 */
export function useCompanions(filters?: SearchFilters) {
  const storeFilters = useSearchFilters();
  const activeFilters = filters ?? storeFilters;

  return useQuery({
    queryKey: queryKeys.companions.list(activeFilters),
    queryFn: () => fetchCompanions(activeFilters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Query: Get single companion
 */
export function useCompanion(id: string) {
  return useQuery({
    queryKey: queryKeys.companions.detail(id),
    queryFn: () => get<Companion>(`/companions/${id}`, { skipAuth: true }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
