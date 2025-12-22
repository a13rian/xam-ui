"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import type { Companion } from "@/features/companions";

function formatPrice(amount: number, currency: string): string {
  if (amount === 0) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN").format(amount) + currency;
}

interface CompanionDetailClientProps {
  companion: Companion;
}

export function CompanionDetailClient({
  companion,
}: CompanionDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [hours, setHours] = useState(1);

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
    specialties,
    languages,
  } = companion;

  const totalPrice = pricing.perHour * hours + (pricing.serviceFee || 0);

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
              Quay lại tìm kiếm
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
                alt={name}
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
                  alt={`${name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      +{images.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Name and Location */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    {name}
                    {age > 0 && `, ${age} năm kinh nghiệm`}
                  </h1>
                  {(location.address || location.city) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="size-4" />
                      <span>
                        {[location.address, location.city, location.country]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="size-5 fill-gray-900 text-gray-900" />
                  <span className="font-semibold">{rating.average || "N/A"}</span>
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
                      {badge === "verified"
                        ? "Đã xác minh"
                        : badge === "popular"
                          ? "Phổ biến"
                          : "Mới"}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Profile Info */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
                {profile.isVerified && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="size-4 text-green-600" />
                    <span>Đã xác minh danh tính</span>
                  </div>
                )}
              </div>
              {profile.avatarUrl ? (
                <div className="size-16 rounded-full overflow-hidden relative">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="size-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    {profile.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Bio */}
            {bio && (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Giới thiệu</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {bio}
                  </p>
                </div>
                <div className="border-t border-gray-200" />
              </>
            )}

            {/* Specialties */}
            {specialties && specialties.length > 0 && (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Chuyên môn</h2>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200" />
              </>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Ngôn ngữ</h2>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <span
                      key={language}
                      className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-semibold">
                    {formatPrice(pricing.perHour, pricing.currency)}
                  </span>
                  <span className="text-gray-600">/ giờ</span>
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
                            !dateFrom && "text-muted-foreground"
                          )}
                        >
                          {dateFrom
                            ? dateFrom.toLocaleDateString("vi-VN", {
                                month: "short",
                                day: "numeric",
                              })
                            : "Từ ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateFrom || undefined}
                          onSelect={(date) => {
                            setDateFrom(date || null);
                            if (date && dateTo && date >= dateTo) {
                              setDateTo(null);
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
                            !dateTo && "text-muted-foreground"
                          )}
                          disabled={!dateFrom}
                        >
                          {dateTo
                            ? dateTo.toLocaleDateString("vi-VN", {
                                month: "short",
                                day: "numeric",
                              })
                            : "Đến ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateTo || undefined}
                          onSelect={(date) => setDateTo(date || null)}
                          disabled={(date) =>
                            !dateFrom || date <= dateFrom || date < new Date()
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Hours */}
                  <div className="border border-gray-200 rounded-full p-2 flex items-center justify-between">
                    <span className="text-sm font-medium px-2">Số giờ</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => setHours(Math.max(1, hours - 1))}
                        className="rounded-full"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {hours}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => setHours(Math.min(24, hours + 1))}
                        className="rounded-full"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Reserve Button */}
                <Button className="w-full h-12 rounded-full mb-4">
                  Đặt lịch
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Bạn sẽ không bị tính phí ngay
                </p>
              </div>

              {/* Price Breakdown */}
              {dateFrom && dateTo && (
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      {formatPrice(pricing.perHour, pricing.currency)} × {hours}{" "}
                      giờ
                    </span>
                    <span className="text-gray-900">
                      {formatPrice(pricing.perHour * hours, pricing.currency)}
                    </span>
                  </div>
                  {pricing.serviceFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Phí dịch vụ</span>
                      <span className="text-gray-900">
                        {formatPrice(pricing.serviceFee, pricing.currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">
                      Tổng cộng
                    </span>
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
