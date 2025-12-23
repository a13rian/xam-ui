import { api } from '@/shared/lib/api';
import type {
  AccountSearchParams,
  AccountSearchResponse,
  IAccount,
} from './account-search.types';

/**
 * Search accounts by geolocation
 * Public endpoint - no authentication required
 */
export async function searchAccounts(
  params: AccountSearchParams
): Promise<AccountSearchResponse> {
  const searchParams = new URLSearchParams();

  // Required params
  searchParams.append('latitude', params.latitude.toString());
  searchParams.append('longitude', params.longitude.toString());

  // Optional params
  if (params.radiusKm !== undefined) {
    searchParams.append('radiusKm', params.radiusKm.toString());
  }
  if (params.search) {
    searchParams.append('search', params.search);
  }
  if (params.city) {
    searchParams.append('city', params.city);
  }
  if (params.district) {
    searchParams.append('district', params.district);
  }
  if (params.ward) {
    searchParams.append('ward', params.ward);
  }
  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString());
  }
  if (params.limit !== undefined) {
    searchParams.append('limit', params.limit.toString());
  }

  return api.get<AccountSearchResponse>(
    `/accounts/search?${searchParams.toString()}`,
    { skipAuth: true }
  );
}

/**
 * Get public account details by ID
 * Public endpoint - no authentication required
 * For use in Server Components with SSR
 */
export async function getPublicAccount(accountId: string): Promise<IAccount> {
  return api.get<IAccount>(`/accounts/${accountId}`, {
    skipAuth: true,
  });
}

/**
 * Server-side fetch for account details
 * Direct fetch without api client for Server Components
 * Uses internal API URL for server-to-server communication
 */
export async function fetchAccountForSSR(
  accountId: string
): Promise<IAccount | null> {
  try {
    const baseUrl = process.env.SERVER_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/v1/accounts/${accountId}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch account: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching account for SSR:', error);
    return null;
  }
}
