import { get } from '@/shared/lib/api';

/**
 * Location response from API
 */
export interface Location {
  id: string;
  name: string;
  street: string;
  ward?: string;
  district: string;
  city: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  isPrimary: boolean;
}

/**
 * Get locations for an account
 * Public endpoint - no authentication required
 */
export async function getAccountLocations(
  accountId: string
): Promise<Location[]> {
  return get<Location[]>(`/accounts/${accountId}/locations`, {
    skipAuth: true,
  });
}
