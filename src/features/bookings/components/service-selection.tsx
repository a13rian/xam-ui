'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { IAccountService } from '@/features/search/api/account-search.types';

interface ServiceSelectionProps {
  services: IAccountService[];
  value: string | undefined;
  onChange: (serviceId: string) => void;
}

function formatPrice(amount: number, currency: string): string {
  if (amount === 0) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ' + currency;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} phút`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} giờ`;
  }
  return `${hours} giờ ${mins} phút`;
}

export function ServiceSelection({
  services,
  value,
  onChange,
}: ServiceSelectionProps) {
  const selectedService = services.find((s) => s.id === value);

  if (services.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Chưa có dịch vụ nào khả dụng cho companion này.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 data-[size=default]:h-12 data-[size=sm]:h-12 rounded-xl border border-gray-200 shadow-sm">
          <SelectValue placeholder="Chọn dịch vụ" />
        </SelectTrigger>
        <SelectContent>
          {services.map((service) => (
            <SelectItem key={service.id} value={service.id}>
              <div className="flex items-center justify-between gap-4 w-full">
                <span>{service.name}</span>
                <span className="text-muted-foreground text-sm">
                  {formatPrice(service.price, service.currency)} •{' '}
                  {formatDuration(service.durationMinutes)}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Selected service summary */}
      {selectedService && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">
                {selectedService.name}
              </h4>
              {selectedService.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {selectedService.description}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="font-semibold text-gray-900">
                {formatPrice(selectedService.price, selectedService.currency)}
              </div>
              <div className="text-sm text-gray-500">
                {formatDuration(selectedService.durationMinutes)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
