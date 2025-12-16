// ============================================
// Wallet Types
// ============================================

export interface Wallet {
  id: string;
  currency: string;
  createdAt: string;
}

export interface Balance {
  balance: number;
  currency: string;
}

export type TransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'payment'
  | 'refund'
  | 'adjustment';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
  balanceAfter: number;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DepositRequest {
  amount: number;
  description?: string;
}

export interface DepositResponse {
  transaction: Transaction;
  newBalance: number;
}
