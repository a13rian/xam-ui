import { get, post } from '@/shared/lib/api';
import type {
  Wallet,
  Balance,
  TransactionListResponse,
  DepositRequest,
  DepositResponse,
} from '../types';

/**
 * Get wallet information
 */
export async function getWallet(): Promise<Wallet> {
  return get<Wallet>('/wallet/me');
}

/**
 * Get wallet balance
 */
export async function getBalance(): Promise<Balance> {
  return get<Balance>('/wallet/me/balance');
}

/**
 * Get transaction history
 */
export async function getTransactions(
  page: number = 1,
  limit: number = 20
): Promise<TransactionListResponse> {
  return get<TransactionListResponse>(
    `/wallet/me/transactions?page=${page}&limit=${limit}`
  );
}

/**
 * Deposit money to wallet
 */
export async function deposit(data: DepositRequest): Promise<DepositResponse> {
  return post<DepositResponse>('/wallet/me/deposit', data);
}
