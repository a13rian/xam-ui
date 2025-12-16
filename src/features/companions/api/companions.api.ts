import { get } from '@/shared/lib/api';
import type { Companion, CompanionsListResponse } from '../types';

export interface CompanionSearchParams {
  location?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  guests?: number;
}

/**
 * Fetch companions with filters
 */
export async function fetchCompanions(filters: CompanionSearchParams = {}): Promise<Companion[]> {
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
  if (filters.guests && filters.guests > 0) {
    params.append('guests', filters.guests.toString());
  }

  const queryString = params.toString();
  const response = await get<CompanionsListResponse>(
    `/companions${queryString ? `?${queryString}` : ''}`,
    { skipAuth: true }
  );

  return response.items;
}

/**
 * Get single companion by ID
 */
export async function getCompanion(id: string): Promise<Companion> {
  return get<Companion>(`/companions/${id}`, { skipAuth: true });
}
