'use client';

import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth';
import { queryKeys } from '@/shared/lib/query';
import { createBooking } from '../api/bookings.api';
import { extractDateAndTime, type BookingFormValues } from '../schemas';
import type { Booking, CreateBookingInput } from '../types';

export interface UseCreateBookingOptions {
  onSuccess?: (booking: Booking) => void;
}

export interface UseCreateBookingReturn {
  submitBooking: (
    values: BookingFormValues,
    organizationId: string
  ) => Promise<void>;
  isCreating: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Hook for creating a booking
 * Form validation is handled by Zod at the form level
 */
export function useCreateBooking(
  options: UseCreateBookingOptions = {}
): UseCreateBookingReturn {
  const { onSuccess } = options;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      if (onSuccess) {
        onSuccess(booking);
      } else {
        router.push(`/bookings/${booking.id}`);
      }
    },
    onError: (err: Error) => {
      setError(err.message || 'Không thể tạo booking. Vui lòng thử lại.');
    },
  });

  const submitBooking = useCallback(
    async (values: BookingFormValues, organizationId: string) => {
      setError(null);

      // Validate user info (not part of form schema)
      if (!isAuthenticated) {
        setError('Bạn cần đăng nhập để đặt lịch.');
        return;
      }

      const customerName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
      const customerPhone = user?.phone?.trim();

      if (!customerName || !customerPhone) {
        setError(
          'Vui lòng cập nhật hồ sơ với họ tên và số điện thoại trước khi đặt lịch.'
        );
        return;
      }

      // Extract date and time from scheduledDateTime
      const { scheduledDate, startTime } = extractDateAndTime(
        values.scheduledDateTime
      );

      // Build booking input
      const input: CreateBookingInput = {
        organizationId,
        locationId: values.selectedLocationId,
        scheduledDate,
        startTime,
        services: [{ serviceId: values.selectedServiceId }],
        isHomeService: false,
        customerPhone,
        customerName,
        notes: values.notes || undefined,
      };

      await mutation.mutateAsync(input);
    },
    [user, isAuthenticated, mutation]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    submitBooking,
    isCreating: mutation.isPending,
    error,
    clearError,
  };
}
