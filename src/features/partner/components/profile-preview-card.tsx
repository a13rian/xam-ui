'use client';

import { motion } from 'motion/react';
import { User, Building2, Star, MapPin, BadgeCheck } from 'lucide-react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface ProfilePreviewCardProps {
  avatar?: string | null;
  displayName: string;
  accountType: 'INDIVIDUAL' | 'BUSINESS';
  specialization?: string;
  businessName?: string;
  bio?: string;
  certifications?: string[];
  className?: string;
}

function getInitials(name?: string): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ProfilePreviewCard({
  avatar,
  displayName,
  accountType,
  specialization,
  businessName,
  bio,
  certifications = [],
  className,
}: ProfilePreviewCardProps) {
  const isIndividual = accountType === 'INDIVIDUAL';
  const hasContent = displayName || specialization || bio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'overflow-hidden rounded-2xl border border-charcoal/10 bg-white',
        className
      )}
    >
      {/* Header label */}
      <div className="border-b border-charcoal/5 bg-cream/50 px-4 py-2">
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal-light">
          Xem trước hồ sơ
        </p>
      </div>

      {/* Preview content */}
      <div className="p-5">
        {hasContent ? (
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="h-20 w-20 border-2 border-charcoal/10">
                {avatar ? (
                  <AvatarImage
                    src={avatar}
                    alt={displayName}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-lavender/20 text-lg font-medium text-lavender-dark">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              {/* Name & verification badge */}
              <div className="flex items-start gap-2">
                <h3 className="font-display text-lg font-medium text-charcoal">
                  {displayName || 'Tên hiển thị'}
                </h3>
                <Badge
                  variant="secondary"
                  className="flex-shrink-0 gap-1 bg-lavender/10 text-lavender-dark"
                >
                  <BadgeCheck className="h-3 w-3" />
                  Xác minh
                </Badge>
              </div>

              {/* Account type & specialization */}
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-charcoal-light">
                <span className="flex items-center gap-1">
                  {isIndividual ? (
                    <User className="h-3.5 w-3.5" />
                  ) : (
                    <Building2 className="h-3.5 w-3.5" />
                  )}
                  {isIndividual ? 'Cá nhân' : businessName || 'Doanh nghiệp'}
                </span>
                {specialization && (
                  <>
                    <span className="text-charcoal/30">|</span>
                    <span>{specialization}</span>
                  </>
                )}
              </div>

              {/* Rating placeholder */}
              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-3.5 w-3.5',
                        i < 4
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-charcoal/10 text-charcoal/10'
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-charcoal-light">
                  Chưa có đánh giá
                </span>
              </div>

              {/* Location placeholder */}
              <div className="mt-1.5 flex items-center gap-1 text-xs text-charcoal-light">
                <MapPin className="h-3 w-3" />
                <span>Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>
        ) : (
          // Empty state
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-cream">
              <User className="h-8 w-8 text-charcoal-light/40" />
            </div>
            <div className="flex-1">
              <div className="h-5 w-32 rounded bg-charcoal/10" />
              <div className="mt-2 h-4 w-24 rounded bg-charcoal/5" />
              <div className="mt-2 h-3 w-20 rounded bg-charcoal/5" />
            </div>
          </div>
        )}

        {/* Bio preview */}
        {bio && (
          <div className="mt-4 border-t border-charcoal/5 pt-4">
            <p className="line-clamp-3 text-sm leading-relaxed text-charcoal-light">
              {bio}
            </p>
          </div>
        )}

        {/* Certifications preview */}
        {certifications.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {certifications.slice(0, 3).map((cert) => (
              <Badge
                key={cert}
                variant="outline"
                className="border-charcoal/10 bg-cream/50 text-xs font-normal text-charcoal-light"
              >
                {cert}
              </Badge>
            ))}
            {certifications.length > 3 && (
              <Badge
                variant="outline"
                className="border-charcoal/10 bg-cream/50 text-xs font-normal text-charcoal-light"
              >
                +{certifications.length - 3} khác
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="border-t border-charcoal/5 bg-cream/30 px-4 py-2">
        <p className="text-center text-xs text-charcoal-light/70">
          Đây là cách hồ sơ của bạn sẽ hiển thị với khách hàng
        </p>
      </div>
    </motion.div>
  );
}
