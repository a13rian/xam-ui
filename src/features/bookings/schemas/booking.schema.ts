import { z } from 'zod';

/**
 * Zod schema for booking form validation
 */
export const bookingFormSchema = z.object({
  scheduledDateTime: z.date({ message: 'Vui lòng chọn ngày và giờ' }),
  selectedServiceId: z.string({ message: 'Vui lòng chọn dịch vụ' }),
  selectedLocationId: z.string({ message: 'Vui lòng chọn địa điểm' }),
  notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

/**
 * Helper to extract date and time from scheduledDateTime
 */
export function extractDateAndTime(dateTime: Date): {
  scheduledDate: string;
  startTime: string;
} {
  return {
    scheduledDate: dateTime.toISOString().split('T')[0],
    startTime: `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`,
  };
}
