"use client";

import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";
import { PropertyCardCarousel } from "./property-card-carousel";
import { PropertyCardBadge } from "./property-card-badge";
import { formatPrice } from "@/lib/mock-data/properties";

interface PropertyCardProps {
  property: Property;
  isSelected?: boolean;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
}

export function PropertyCard({
  property,
  isSelected = false,
  isHovered = false,
  onHover,
  onLeave,
  onClick,
}: PropertyCardProps) {
  const {
    title,
    description,
    images,
    location,
    host,
    pricing,
    rating,
    badges,
  } = property;

  // Calculate total price for 5 nights (example)
  const nights = 5;
  const totalPrice =
    pricing.perNight * nights +
    (pricing.cleaningFee || 0) +
    (pricing.serviceFee || 0);

  return (
    <article
      className={cn(
        "group cursor-pointer rounded-xl transition-all duration-200",
        isSelected && "ring-2 ring-gray-900",
        isHovered && "scale-[1.02]"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Image carousel with badges */}
      <div className="relative">
        <PropertyCardCarousel images={images} alt={title} />

        {/* Display badges */}
        {badges.length > 0 && (
          <PropertyCardBadge badge={badges[0]} />
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
      </div>

      {/* Property details */}
      <div className="pt-3 space-y-1">
        {/* Title and rating row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 truncate">
            {title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="size-3.5 fill-gray-900 text-gray-900" />
            <span className="text-sm font-medium">{rating.average}</span>
          </div>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-500 truncate">
          {location.city}, {location.country}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 truncate">{description}</p>

        {/* Host info */}
        {host.isSuperhost && (
          <p className="text-sm text-gray-500">
            Hosted by {host.name}
          </p>
        )}

        {/* Pricing */}
        <div className="pt-1">
          <span className="font-semibold text-gray-900">
            {formatPrice(pricing.perNight, pricing.currency)}
          </span>
          <span className="text-gray-500 text-sm"> night</span>
          <span className="text-gray-400 text-sm mx-1">·</span>
          <span className="text-gray-500 text-sm underline">
            {formatPrice(totalPrice, pricing.currency)} total
          </span>
        </div>
      </div>
    </article>
  );
}
