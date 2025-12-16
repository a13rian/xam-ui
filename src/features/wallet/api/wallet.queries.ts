'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/query';
import { getWallet, getBalance, getTransactions, deposit } from './wallet.api';
import type { DepositRequest } from '../types';

/**
 * Query: Get wallet info
 */
export function useWallet() {
  return useQuery({
    queryKey: queryKeys.wallet.info(),
    queryFn: getWallet,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Query: Get wallet balance
 */
export function useBalance() {
  return useQuery({
    queryKey: queryKeys.wallet.balance(),
    queryFn: getBalance,
    staleTime: 30 * 1000, // 30 seconds - balance changes more frequently
  });
}

/**
 * Query: Get transactions with pagination
 */
export function useTransactions(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: queryKeys.wallet.transactions(page, limit),
    queryFn: () => getTransactions(page, limit),
    staleTime: 30 * 1000,
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Combined hook for wallet tab
 */
export function useWalletData() {
  const walletQuery = useWallet();
  const balanceQuery = useBalance();

  return {
    wallet: walletQuery.data,
    balance: balanceQuery.data,
    isLoading: walletQuery.isLoading || balanceQuery.isLoading,
    error: walletQuery.error || balanceQuery.error,
    refetch: () => {
      walletQuery.refetch();
      balanceQuery.refetch();
    },
  };
}

/**
 * Mutation: Deposit
 */
export function useDeposit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DepositRequest) => deposit(data),
    onSuccess: () => {
      // Invalidate wallet and balance queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.balance() });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
    },
  });
}
