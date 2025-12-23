'use client';

import { DateTimePicker } from '@/shared/components/ui/date-time-picker';

interface BookingDateTimePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export function BookingDateTimePicker({
  value,
  onChange,
}: BookingDateTimePickerProps) {
  return (
    <DateTimePicker
      value={value}
      onChange={onChange}
      disabled={(date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      }}
      className="h-12 rounded-xl border border-gray-200 shadow-sm"
    />
  );
}
