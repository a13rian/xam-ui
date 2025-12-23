'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/shared/lib/query';
import { listAccounts, getAccount, updateAccountStatus } from './account.api';
import type {
  ListAccountsParams,
  ListAccountsResponse,
  Account,
  UpdateAccountStatusRequest,
} from '../types';

export function useAccounts(params: ListAccountsParams = {}) {
  return useQuery<ListAccountsResponse>({
    queryKey: queryKeys.accounts.list(params),
    queryFn: () => listAccounts(params),
    staleTime: 30 * 1000,
  });
}

export function useAccount(id: string) {
  return useQuery<Account>({
    queryKey: queryKeys.accounts.detail(id),
    queryFn: () => getAccount(id),
    enabled: !!id,
  });
}

export function useUpdateAccountStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateAccountStatusRequest;
    }) => updateAccountStatus(id, data),
    onSuccess: (_, variables) => {
      toast.success('Account status updated successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.accounts.detail(variables.id),
      });
      // Also invalidate partner pending list
      queryClient.invalidateQueries({ queryKey: queryKeys.partner.pendingAll() });
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || 'Failed to update account status');
    },
  });
}

// Re-export existing partner query hooks
export {
  usePendingAccounts,
  useApproveAccount,
  useRejectAccount,
} from '@/features/partner/api/partner.queries';
