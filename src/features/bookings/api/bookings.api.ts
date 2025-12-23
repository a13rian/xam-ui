import { get, post } from '@/shared/lib/api';
import type {
  BookingsListResponse,
  ListBookingsParams,
  Booking,
  CreateBookingInput,
} from '../types';

/**
 * Get my bookings
 */
export async function getMyBookings(
  query?: ListBookingsParams,
): Promise<BookingsListResponse> {
  const params = new URLSearchParams();
  if (query?.page) params.append('page', query.page.toString());
  if (query?.limit) params.append('limit', query.limit.toString());
  if (query?.status) params.append('status', query.status);

  const queryString = params.toString();
  return get<BookingsListResponse>(
    `/bookings/me${queryString ? `?${queryString}` : ''}`,
  );
}

/**
 * Get booking by ID
 */
export async function getBooking(id: string): Promise<Booking> {
  return get<Booking>(`/bookings/${id}`);
}

/**
 * Create a new booking
 */
export async function createBooking(
  input: CreateBookingInput
): Promise<Booking> {
  return post<Booking>('/bookings', input);
}
