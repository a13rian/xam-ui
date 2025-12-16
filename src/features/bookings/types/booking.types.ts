// ============================================
// Booking Types
// ============================================

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface BookingService {
  id: string;
  serviceName: string;
  price: number;
  duration: number;
}

export interface Booking {
  id: string;
  status: BookingStatus;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  customerAddress?: string;
  totalAmount: number;
  currency: string;
  services: BookingService[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingsListResponse {
  items: Booking[];
  total: number;
  limit: number;
}

export interface ListBookingsParams {
  page?: number;
  limit?: number;
  status?: BookingStatus;
}

export interface CreateBookingInput {
  companionId: string;
  date: string;
  services: string[];
  address?: string;
}
