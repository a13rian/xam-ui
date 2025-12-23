'use client';

import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { Textarea } from '@/shared/components/ui/textarea';

interface BookingHomeServiceToggleProps {
  isHomeService: boolean;
  customerAddress: string;
  onHomeServiceChange: (value: boolean) => void;
  onAddressChange: (address: string) => void;
}

export function BookingHomeServiceToggle({
  isHomeService,
  customerAddress,
  onHomeServiceChange,
  onAddressChange,
}: BookingHomeServiceToggleProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div className="space-y-0.5">
          <Label htmlFor="isHomeService">Dịch vụ tại nhà</Label>
          <p className="text-sm text-gray-500">
            Companion sẽ đến địa chỉ của bạn
          </p>
        </div>
        <Switch
          id="isHomeService"
          checked={isHomeService}
          onCheckedChange={onHomeServiceChange}
        />
      </div>

      {isHomeService && (
        <div>
          <Label htmlFor="customerAddress" className="required">
            Địa chỉ
          </Label>
          <Textarea
            id="customerAddress"
            value={customerAddress}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, thành phố)"
            rows={3}
          />
        </div>
      )}
    </div>
  );
}
