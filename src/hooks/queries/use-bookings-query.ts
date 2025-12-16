'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query';
import { getMyBookings, getBooking } from '@/lib/api/bookings';
import type { ListBookingsQuery } from '@/types/api';

/**
 * Query: Get user's bookings with pagination and filters
 */
export function useBookings(params: ListBookingsQuery = {}) {
  const { page = 1, limit = 10, status } = params;

  return useQuery({
    queryKey: queryKeys.bookings.list({ page, limit, status }),
    queryFn: () => getMyBookings({ page, limit, status }),
    staleTime: 60 * 1000, // 1 minute
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Query: Get single booking
 */
export function useBooking(id: string) {
  return useQuery({
    queryKey: queryKeys.bookings.detail(id),
    queryFn: () => getBooking(id),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}
