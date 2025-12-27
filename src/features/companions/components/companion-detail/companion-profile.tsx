'use client';

import { motion } from 'motion/react';
import { Star, BadgeCheck, Users, Globe, MessageCircle } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { fadeInUp, staggerContainer } from '@/features/landing';
import { formatPrice } from '../../utils/format-price';
import { getLanguageName } from '../../utils/language-names';

interface PriceRange {
  min: number;
  max: number;
  currency?: string;
}

interface CompanionProfileProps {
  displayName: string;
  tagline: string | null;
  specialization: string | null;
  isVerified: boolean;
  rating: number | null;
  totalReviews: number;
  completedBookings: number;
  languages: string[];
  priceRange: PriceRange | null;
  accountId: string;
}

export function CompanionProfile({
  displayName,
  tagline,
  specialization,
  isVerified,
  rating,
  totalReviews,
  completedBookings,
  languages,
  priceRange,
  accountId,
}: CompanionProfileProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="pt-16 md:pt-20"
    >
      {/* Name and Verification */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-center gap-3 mb-3"
      >
        <h1 className="font-display text-3xl md:text-4xl font-medium text-charcoal">
          {displayName}
        </h1>
        {isVerified && (
          <Badge
            variant="secondary"
            className="gap-1.5 bg-lavender/20 text-lavender-dark border-0"
          >
            <BadgeCheck className="size-4" />
            Đã xác minh
          </Badge>
        )}
      </motion.div>

      {/* Tagline */}
      {tagline && (
        <motion.p
          variants={fadeInUp}
          className="text-lg text-charcoal-light italic mb-2"
        >
          &ldquo;{tagline}&rdquo;
        </motion.p>
      )}

      {/* Specialization */}
      {specialization && (
        <motion.p
          variants={fadeInUp}
          className="text-sm font-medium text-charcoal mb-6"
        >
          {specialization}
        </motion.p>
      )}

      {/* Stats Row */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-center gap-6 mb-6"
      >
        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star className="size-5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-charcoal">
            {rating?.toFixed(1) || 'Mới'}
          </span>
          <span className="text-charcoal-light">({totalReviews} đánh giá)</span>
        </div>

        {/* Completed Bookings */}
        <div className="flex items-center gap-2 text-charcoal-light">
          <Users className="size-4" />
          <span>{completedBookings} lượt đặt</span>
        </div>

        {/* Languages */}
        {languages.length > 0 && (
          <div className="flex items-center gap-2 text-charcoal-light">
            <Globe className="size-4" />
            <span>{languages.map(getLanguageName).join(', ')}</span>
          </div>
        )}
      </motion.div>

      {/* Price Range */}
      {priceRange && (
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-baseline gap-2 bg-white px-5 py-3 rounded-full shadow-sm mb-6"
        >
          <span className="text-sm text-charcoal-light">Giá từ</span>
          <span className="text-xl font-bold text-charcoal">
            {formatPrice(priceRange.min, priceRange.currency)}
          </span>
          <span className="text-charcoal-light">-</span>
          <span className="text-xl font-bold text-charcoal">
            {formatPrice(priceRange.max, priceRange.currency)}
          </span>
        </motion.div>
      )}

      {/* Message Button - visible on mobile only since desktop has BookingCard */}
      <motion.div variants={fadeInUp} className="lg:hidden">
        <Button variant="outline" size="lg" className="w-full" asChild>
          <a href={`/messages?to=${accountId}`}>
            <MessageCircle className="size-4 mr-2" />
            Nhắn Tin
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}
