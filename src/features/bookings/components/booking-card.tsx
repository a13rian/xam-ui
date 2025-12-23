'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/features/auth';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
// Note: FormControl is only used for primitive inputs (Input, Textarea, Select)
// Complex components like ServiceSelection, BookingDateTimePicker should NOT be wrapped in FormControl
import { useAccountLocations } from '../api/locations.queries';
import { useCreateBooking } from '../hooks/use-create-booking';
import { bookingFormSchema, type BookingFormValues } from '../schemas';
import { ServiceSelection } from './service-selection';
import { BookingDateTimePicker } from './booking-date-time-picker';
import { BookingLocationSelect } from './booking-location-select';
import type { IAccountService } from '@/features/search/api/account-search.types';

interface BookingCardProps {
  accountId: string;
  organizationId: string | null;
  services: IAccountService[];
}

export function BookingCard({
  accountId,
  organizationId,
  services,
}: BookingCardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { data: locations = [] } = useAccountLocations(accountId);
  const primaryLocation = locations.find((l) => l.isPrimary) ?? locations[0];

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      scheduledDateTime: undefined,
      selectedServiceId: undefined,
      selectedLocationId: undefined,
      notes: '',
    },
  });

  const { submitBooking, isCreating, error } = useCreateBooking();

  // Set default location when locations load
  useEffect(() => {
    if (primaryLocation && !form.getValues('selectedLocationId')) {
      form.setValue('selectedLocationId', primaryLocation.id);
    }
  }, [primaryLocation, form]);

  const onSubmit = async (values: BookingFormValues) => {
    if (!isAuthenticated) {
      router.push('/sign-in');
      return;
    }

    if (!organizationId) {
      return;
    }

    await submitBooking(values, organizationId);
  };

  return (
    <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 shadow-lg space-y-6 bg-white">
      <h3 className="text-xl font-semibold">Đặt lịch hẹn</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Service Selection */}
          <FormField
            control={form.control}
            name="selectedServiceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Chọn dịch vụ
                </FormLabel>
                <ServiceSelection
                  services={services}
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date and Time Selection */}
          <FormField
            control={form.control}
            name="scheduledDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Chọn ngày và giờ
                </FormLabel>
                <BookingDateTimePicker
                  value={field.value ?? null}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location Selection */}
          <FormField
            control={form.control}
            name="selectedLocationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Chọn địa điểm
                </FormLabel>
                <BookingLocationSelect
                  accountId={accountId}
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Ghi chú (tùy chọn)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Thêm ghi chú hoặc yêu cầu đặc biệt..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-base font-semibold"
            disabled={isCreating || isAuthLoading}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : isAuthenticated ? (
              'Đặt lịch ngay'
            ) : (
              'Đăng nhập để đặt lịch'
            )}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Bạn sẽ không bị tính phí ngay
          </p>
        </form>
      </Form>
    </div>
  );
}
