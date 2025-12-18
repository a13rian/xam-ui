import { get, patch } from '@/shared/lib/api';
import type {
  Account,
  ListAccountsParams,
  ListAccountsResponse,
  UpdateAccountStatusRequest,
} from '../types';

export async function listAccounts(
  params: ListAccountsParams = {}
): Promise<ListAccountsResponse> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.set('page', String(params.page));
  if (params.limit) queryParams.set('limit', String(params.limit));
  if (params.type) queryParams.set('type', params.type);
  if (params.status) queryParams.set('status', params.status);
  if (params.search) queryParams.set('search', params.search);

  const query = queryParams.toString();
  return get<ListAccountsResponse>(`/admin/accounts${query ? `?${query}` : ''}`);
}

export async function getAccount(id: string): Promise<Account> {
  return get<Account>(`/admin/accounts/${id}`);
}

export async function updateAccountStatus(
  id: string,
  data: UpdateAccountStatusRequest
): Promise<Account> {
  return patch<Account>(`/admin/accounts/${id}/status`, data);
}

// Re-export existing partner APIs
export {
  listPendingAccounts,
  approveAccount,
  rejectAccount,
} from '@/features/partner/api/partner.api';
