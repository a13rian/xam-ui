'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/query';
import type {
  NotificationSettings,
  UpdateNotificationSettingsRequest,
} from '../types';
import {
  changePassword,
  requestEmailVerification,
  getNotificationSettings,
  updateNotificationSettings,
  getEmailVerificationStatus,
} from './profile.api';

// ============================================
// Password Mutation
// ============================================

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

// ============================================
// Email Verification
// ============================================

export function useEmailVerificationStatus() {
  return useQuery({
    queryKey: queryKeys.profile.verificationStatus(),
    queryFn: getEmailVerificationStatus,
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useRequestEmailVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestEmailVerification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.verificationStatus(),
      });
    },
  });
}

// ============================================
// Notification Settings
// ============================================

export function useNotificationSettings() {
  return useQuery({
    queryKey: queryKeys.profile.notifications(),
    queryFn: getNotificationSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationSettings,
    onMutate: async (newSettings: UpdateNotificationSettingsRequest) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.profile.notifications(),
      });

      // Snapshot the previous value
      const previousSettings = queryClient.getQueryData<NotificationSettings>(
        queryKeys.profile.notifications()
      );

      // Optimistically update to the new value
      if (previousSettings) {
        queryClient.setQueryData<NotificationSettings>(
          queryKeys.profile.notifications(),
          { ...previousSettings, ...newSettings }
        );
      }

      return { previousSettings };
    },
    onError: (_err, _newSettings, context) => {
      // Rollback on error
      if (context?.previousSettings) {
        queryClient.setQueryData(
          queryKeys.profile.notifications(),
          context.previousSettings
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.notifications(),
      });
    },
  });
}
