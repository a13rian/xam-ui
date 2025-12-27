'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { formatPrice } from '../../utils/format-price';

interface PriceRange {
  min: number;
  max: number;
  currency?: string;
}

interface CompanionBookingCTAProps {
  accountId: string;
  displayName: string;
  priceRange: PriceRange | null;
}

export function CompanionBookingCTA({
  accountId,
  priceRange,
}: CompanionBookingCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 safe-area-pb">
      <div className="flex items-center justify-between gap-4">
        {/* Price info */}
        {priceRange && (
          <div className="flex flex-col">
            <span className="text-xs text-charcoal-light">Giá từ</span>
            <span className="text-lg font-bold text-charcoal">
              {formatPrice(priceRange.min, priceRange.currency)}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <Button size="lg" className="flex-1 max-w-[200px]" asChild>
          <Link href={`/booking/new?accountId=${accountId}`}>
            <Calendar className="size-4 mr-2" />
            Đặt Lịch Ngay
          </Link>
        </Button>
      </div>
    </div>
  );
}
