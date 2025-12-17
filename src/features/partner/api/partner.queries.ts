'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { queryKeys } from '@/shared/lib/query';
import { getMyAccount, registerPartner } from './partner.api';
import type {
  AccountStatusResponse,
  RegisterAccountRequest,
} from '../types';

export function usePartnerRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterAccountRequest) =>
      registerPartner(payload),
    onSuccess: () => {
      toast.success(
        'Hồ sơ của bạn đã được gửi. Vui lòng chờ admin phê duyệt.',
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.partner.account(),
      });
      router.push('/become-partner');
    },
    onError: (error: { message?: string }) => {
      const msg =
        error?.message ||
        'Đăng ký partner thất bại. Vui lòng thử lại sau.';
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


