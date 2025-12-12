"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Users, Bed, Bath, Home, Heart, Share2, MapPin } from "lucide-react";
import { mockProperties, formatPrice } from "@/lib/mock-data/properties";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const property = mockProperties.find((p) => p.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  if (!property) {
    router.push("/search");
    return null;
  }

  const {
    title,
    description,
    images,
    location,
    host,
    pricing,
    rating,
    badges,
    maxGuests,
    bedrooms,
    beds,
    bathrooms,
  } = property;

  const nights = checkInDate && checkOutDate
    ? Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    : 1;
  const totalPrice =
    pricing.perNight * nights +
    (pricing.cleaningFee || 0) +
    (pricing.serviceFee || 0);

  const amenities = [
    "WiFi",
    "Kitchen",
    "Washing machine",
    "Air conditioning",
    "Heating",
    "TV",
    "Hair dryer",
    "Iron",
    "Free parking",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to search
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[500px] md:h-[600px]">
            {/* Main image */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden">
              <Image
                src={images[selectedImageIndex] || images[0]}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnail images */}
            {images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative rounded-2xl overflow-hidden cursor-pointer transition-opacity",
                  selectedImageIndex === index && "ring-2 ring-gray-900"
                )}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">+{images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Location */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="size-4" />
                    <span>{location.address}, {location.city}, {location.country}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="size-5 fill-gray-900 text-gray-900" />
                  <span className="font-semibold">{rating.average}</span>
                  <span className="text-gray-500">({rating.count})</span>
                </div>
              </div>

              {/* Badges */}
              {badges.length > 0 && (
                <div className="flex items-center gap-2">
                  {badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                    >
                      {badge === "superhost" ? "Superhost" : "Guest Favorite"}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Host Info */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Hosted by {host.name}</h2>
                {host.isSuperhost && (
                  <p className="text-sm text-gray-600">Superhost · 5 years hosting</p>
                )}
              </div>
              <div className="size-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-600">
                  {host.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Users className="size-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-semibold">{maxGuests}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bed className="size-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-semibold">{bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bed className="size-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Beds</p>
                  <p className="font-semibold">{beds}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bath className="size-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-semibold">{bathrooms}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <Home className="size-4 text-gray-600" />
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-semibold">
                    {formatPrice(pricing.perNight, pricing.currency)}
                  </span>
                  <span className="text-gray-600">night</span>
                </div>

                {/* Date Selection */}
                <div className="space-y-4 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 rounded-full justify-start text-left font-normal",
                            !checkInDate && "text-muted-foreground"
                          )}
                        >
                          {checkInDate
                            ? checkInDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "Check-in"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkInDate || undefined}
                          onSelect={(date) => {
                            setCheckInDate(date || null);
                            if (date && checkOutDate && date >= checkOutDate) {
                              setCheckOutDate(null);
                            }
                          }}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 rounded-full justify-start text-left font-normal",
                            !checkOutDate && "text-muted-foreground"
                          )}
                          disabled={!checkInDate}
                        >
                          {checkOutDate
                            ? checkOutDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "Check-out"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOutDate || undefined}
                          onSelect={(date) => setCheckOutDate(date || null)}
                          disabled={(date) =>
                            !checkInDate || date <= checkInDate || date < new Date()
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-full justify-between font-normal"
                      >
                        <span>Guests</span>
                        <span>{guests} {guests === 1 ? "guest" : "guests"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56" align="end">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Guests</span>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => setGuests(Math.max(1, guests - 1))}
                              className="rounded-full"
                            >
                              -
                            </Button>
                            <span className="w-6 text-center font-medium">{guests}</span>
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                              className="rounded-full"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Reserve Button */}
                <Button className="w-full h-12 rounded-full mb-4">
                  Reserve
                </Button>

                <p className="text-center text-sm text-gray-600">
                  You won&apos;t be charged yet
                </p>
              </div>

              {/* Price Breakdown */}
              {(checkInDate && checkOutDate) && (
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      {formatPrice(pricing.perNight, pricing.currency)} × {nights} nights
                    </span>
                    <span className="text-gray-900">
                      {formatPrice(pricing.perNight * nights, pricing.currency)}
                    </span>
                  </div>
                  {pricing.cleaningFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Cleaning fee</span>
                      <span className="text-gray-900">
                        {formatPrice(pricing.cleaningFee, pricing.currency)}
                      </span>
                    </div>
                  )}
                  {pricing.serviceFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Service fee</span>
                      <span className="text-gray-900">
                        {formatPrice(pricing.serviceFee, pricing.currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(totalPrice, pricing.currency)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
