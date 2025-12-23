import { get } from '@/shared/lib/api';

/**
 * Service response from API
 */
export interface Service {
  id: string;
  organizationId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  durationMinutes: number;
  bookingType: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Services list response
 */
export interface ServicesListResponse {
  items: Service[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Get services for an account
 * Public endpoint - no authentication required
 */
export async function getAccountServices(
  accountId: string
): Promise<ServicesListResponse> {
  return get<ServicesListResponse>(`/accounts/${accountId}/services`, {
    skipAuth: true,
  });
}
