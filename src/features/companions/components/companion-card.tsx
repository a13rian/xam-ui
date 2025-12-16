"use client";

import Link from "next/link";
import { Heart, Star, MapPin } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Companion } from "@/features/companions";
import { CompanionCardCarousel } from "./companion-card-carousel";
import { CompanionCardBadge } from "./companion-card-badge";
import { formatPrice } from "@/shared/mock-data";

interface CompanionCardProps {
  companion: Companion;
  isSelected?: boolean;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
}

export function CompanionCard({
  companion,
  isSelected = false,
  isHovered = false,
  onHover,
  onLeave,
  onClick,
}: CompanionCardProps) {
  const {
    name,
    bio,
    images,
    location,
    profile,
    pricing,
    rating,
    badges,
    age,
  } = companion;

  return (
    <article
      className={cn(
        "group cursor-pointer rounded-xl transition-all duration-200",
        isHovered && "scale-[1.02]"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Image carousel with badges */}
      <Link href={`/companions/${companion.id}`} className="relative block" onClick={(e) => e.stopPropagation()}>
        <CompanionCardCarousel images={images} alt={name} />

        {/* Display badges */}
        {badges.length > 0 && (
          <CompanionCardBadge badge={badges[0]} />
        )}

        {/* Favorite button */}
        <button
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: Handle favorite toggle
          }}
          aria-label="Add to favorites"
        >
          <Heart className="size-6 text-white drop-shadow-md hover:scale-110 transition-transform" />
        </button>
      </Link>

      {/* Companion details */}
      <div className="pt-3 space-y-1">
        {/* Name and rating row */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/companions/${companion.id}`}
            className="font-semibold text-gray-900 truncate hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {name}, {age}
          </Link>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="size-3.5 fill-gray-900 text-gray-900" />
            <span className="text-sm font-medium">{rating.average}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="size-3.5" />
          <span className="truncate">{location.city}, {location.country}</span>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-500 truncate">{bio}</p>

        {/* Verified badge */}
        {profile.isVerified && (
          <p className="text-sm text-gray-500">
            Đã xác minh
          </p>
        )}

        {/* Pricing */}
        <div className="pt-1">
          <span className="font-semibold text-gray-900">
            {formatPrice(pricing.perHour, pricing.currency)}
          </span>
          <span className="text-gray-500 text-sm"> / giờ</span>
        </div>
      </div>
    </article>
  );
}
