'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useAccountLocations } from '../api/locations.queries';

interface BookingLocationSelectProps {
  accountId: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function BookingLocationSelect({
  accountId,
  value,
  onChange,
  disabled = false,
}: BookingLocationSelectProps) {
  const { data: locations = [], isLoading } = useAccountLocations(accountId);

  if (locations.length === 0 && !isLoading) {
    return null;
  }

  if (isLoading) {
    return <Skeleton className="h-12 w-full rounded-xl" />;
  }

  return (
    <Select value={value || ''} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full h-12 data-[size=default]:h-12 data-[size=sm]:h-12 rounded-xl border border-gray-200 shadow-sm">
        <SelectValue placeholder="Chọn địa điểm" />
      </SelectTrigger>
      <SelectContent>
        {locations.map((loc) => (
          <SelectItem key={loc.id} value={loc.id}>
            {loc.name}
            {loc.isPrimary && ' (Mặc định)'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
