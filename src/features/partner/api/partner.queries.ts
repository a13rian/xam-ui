'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { queryKeys } from '@/shared/lib/query';
import {
  getMyAccount,
  registerPartner,
  listPendingAccounts,
  approveAccount,
  rejectAccount,
} from './partner.api';
import type { AccountStatusResponse, RegisterAccountRequest } from '../types';
import type { ListPendingAccountsResponse } from './partner.api';

export function usePartnerRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterAccountRequest) => registerPartner(payload),
    onSuccess: () => {
      toast.success('Hồ sơ của bạn đã được gửi. Vui lòng chờ admin phê duyệt.');
      queryClient.invalidateQueries({
        queryKey: queryKeys.partner.account(),
      });
      router.push('/become-partner');
    },
    onError: (error: { message?: string }) => {
      const msg =
        error?.message || 'Đăng ký partner thất bại. Vui lòng thử lại sau.';
      toast.error(msg);
    },
  });
}

export function usePartnerAccountStatus() {
  return useQuery<AccountStatusResponse>({
    queryKey: queryKeys.partner.account(),
    queryFn: getMyAccount,
    staleTime: 60 * 1000,
  });
}

export function usePendingAccounts(page: number = 1, limit: number = 20) {
  return useQuery<ListPendingAccountsResponse>({
    queryKey: queryKeys.partner.pending(page, limit),
    queryFn: () => listPendingAccounts(page, limit),
    staleTime: 30 * 1000,
  });
}

export function useApproveAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveAccount,
    onSuccess: () => {
      toast.success('Đã phê duyệt partner thành công');
      queryClient.invalidateQueries({
        queryKey: queryKeys.partner.pendingAll(),
      });
    },
    onError: (error: { message?: string }) => {
      const msg =
        error?.message || 'Phê duyệt partner thất bại. Vui lòng thử lại sau.';
      toast.error(msg);
    },
  });
}

export function useRejectAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      rejectAccount(id, reason),
    onSuccess: () => {
      toast.success('Đã từ chối partner thành công');
      queryClient.invalidateQueries({
        queryKey: queryKeys.partner.pendingAll(),
      });
    },
    onError: (error: { message?: string }) => {
      const msg =
        error?.message || 'Từ chối partner thất bại. Vui lòng thử lại sau.';
      toast.error(msg);
    },
  });
}
