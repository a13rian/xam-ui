import { get, post } from '@/shared/lib/api';
import type { RegisterAccountRequest, AccountStatusResponse } from '../types';

export async function registerPartner(
  data: RegisterAccountRequest
): Promise<unknown> {
  return post('/accounts/register', data);
}

export async function getMyAccount(): Promise<AccountStatusResponse> {
  return get<AccountStatusResponse>('/accounts/me');
}

export interface PendingAccount {
  id: string;
  userId: string;
  type: string;
  displayName: string;
  specialization: string | null;
  yearsExperience: number | null;
  personalBio: string | null;
  portfolio: string | null;
  certifications: string[];
  status: string;
  createdAt: string;
  rejectionReason: string | null;
}

export interface ListPendingAccountsResponse {
  items: PendingAccount[];
  total: number;
  page: number;
  limit: number;
}

export async function listPendingAccounts(
  page: number = 1,
  limit: number = 20
): Promise<ListPendingAccountsResponse> {
  return get<ListPendingAccountsResponse>(
    `/admin/accounts/pending?page=${page}&limit=${limit}`
  );
}

export async function approveAccount(id: string): Promise<void> {
  return post(`/admin/accounts/${id}/approve`);
}

export async function rejectAccount(id: string, reason: string): Promise<void> {
  return post(`/admin/accounts/${id}/reject`, { reason });
}
