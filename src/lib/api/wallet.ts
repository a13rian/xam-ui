import { get, post } from './client';
import type {
  WalletResponse,
  BalanceResponse,
  TransactionListResponse,
  DepositRequest,
  DepositResponse,
} from './types';

/**
 * Get wallet information
 */
export async function getWallet(): Promise<WalletResponse> {
  return get<WalletResponse>('/wallet/me');
}

/**
 * Get wallet balance
 */
export async function getBalance(): Promise<BalanceResponse> {
  return get<BalanceResponse>('/wallet/me/balance');
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
