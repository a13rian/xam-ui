'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/query';
import { fetchCompanions, getCompanion, type CompanionSearchParams } from './companions.api';

/**
 * Query: Get companions with filters
 */
export function useCompanions(filters?: CompanionSearchParams) {
  return useQuery({
    queryKey: queryKeys.companions.list(filters),
    queryFn: () => fetchCompanions(filters || {}),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Query: Get single companion
 */
export function useCompanion(id: string) {
  return useQuery({
    queryKey: queryKeys.companions.detail(id),
    queryFn: () => getCompanion(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
