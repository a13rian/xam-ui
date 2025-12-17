import { get, post } from '@/shared/lib/api';
import type {
  RegisterAccountRequest,
  AccountStatusResponse,
} from '../types';

export async function registerPartner(
  data: RegisterAccountRequest,
): Promise<unknown> {
  return post('/accounts/register', data);
}

export async function getMyAccount(): Promise<AccountStatusResponse> {
  return get<AccountStatusResponse>('/accounts/me');
}


