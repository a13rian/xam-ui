'use client';

import Image from 'next/image';
import { Star, BadgeCheck, Users, Globe } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { formatPrice } from '../../utils/format-price';
import { getLanguageName } from '../../utils/language-names';

interface PriceRange {
  min: number;
  max: number;
  currency?: string;
}

interface CompanionProfileProps {
  avatarUrl: string | null;
  displayName: string;
  tagline: string | null;
  specialization: string | null;
  isVerified: boolean;
  rating: number | null;
  totalReviews: number;
  completedBookings: number;
  languages: string[];
  priceRange: PriceRange | null;
}

export function CompanionProfile({
  avatarUrl,
  displayName,
  tagline,
  specialization,
  isVerified,
  rating,
  totalReviews,
  completedBookings,
  languages,
  priceRange,
}: CompanionProfileProps) {
  return (
    <div className="relative -mt-20 mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative size-28 md:size-36 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {displayName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {displayName}
              </h1>
              {isVerified && (
                <Badge variant="secondary" className="gap-1 shrink-0">
                  <BadgeCheck className="size-3.5 text-blue-600" />
                  Đã xác minh
                </Badge>
              )}
            </div>

            {/* Tagline */}
            {tagline && (
              <p className="text-lg text-gray-600 mb-3 italic">
                &ldquo;{tagline}&rdquo;
              </p>
            )}

            {/* Specialization */}
            {specialization && (
              <p className="text-sm font-medium text-gray-700 mb-4">
                {specialization}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <Star className="size-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-900">
                  {rating?.toFixed(1) || 'Mới'}
                </span>
                <span className="text-gray-500">({totalReviews} đánh giá)</span>
              </div>

              {/* Completed Bookings */}
              <div className="flex items-center gap-1.5 text-gray-600">
                <Users className="size-4" />
                <span>{completedBookings} lượt đặt</span>
              </div>

              {/* Languages */}
              {languages.length > 0 && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Globe className="size-4" />
                  <span>{languages.map(getLanguageName).join(', ')}</span>
                </div>
              )}
            </div>

            {/* Price Range */}
            {priceRange && (
              <div className="mt-4 inline-flex items-baseline gap-1.5 bg-gray-100 px-4 py-2 rounded-full">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(priceRange.min, priceRange.currency)}
                </span>
                <span className="text-gray-500">-</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(priceRange.max, priceRange.currency)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
