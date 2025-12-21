'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui';
import { SectionHeader } from './shared';
import { fadeInUp, cardHover, premiumEase } from './shared';

// Mock data for featured partners
const featuredPartners = [
  {
    id: '1',
    name: 'Minh Anh',
    specialty: 'Tâm lý & Cuộc sống',
    rating: 4.9,
    reviews: 128,
    pricePerHour: 150000,
    avatar: 'MA',
    isVerified: true,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Hoàng Long',
    specialty: 'Sự nghiệp & Công việc',
    rating: 4.8,
    reviews: 96,
    pricePerHour: 200000,
    avatar: 'HL',
    isVerified: true,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Thu Hà',
    specialty: 'Mối quan hệ',
    rating: 5.0,
    reviews: 84,
    pricePerHour: 180000,
    avatar: 'TH',
    isVerified: true,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Đức Minh',
    specialty: 'Tài chính cá nhân',
    rating: 4.7,
    reviews: 62,
    pricePerHour: 250000,
    avatar: 'ĐM',
    isVerified: true,
    isOnline: true,
  },
  {
    id: '5',
    name: 'Lan Phương',
    specialty: 'Sức khỏe tinh thần',
    rating: 4.9,
    reviews: 110,
    pricePerHour: 175000,
    avatar: 'LP',
    isVerified: true,
    isOnline: false,
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
}

export function FeaturedPartners() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            label="Partners"
            title="Gặp Gỡ Partners"
            subtitle="Của Chúng Tôi"
            description="Những người đồng hành đáng tin cậy, sẵn sàng lắng nghe và chia sẻ cùng bạn."
            className="mb-0"
          />

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
            >
              Xem tất cả
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredPartners.map((partner) => (
                <CarouselItem
                  key={partner.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    whileHover={cardHover}
                    transition={{ duration: 0.3, ease: premiumEase }}
                  >
                    <Link
                      href={`/companions/${partner.id}`}
                      className="group block"
                      data-testid="partner-card"
                    >
                      <div className="rounded-2xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
                        {/* Avatar */}
                        <div className="relative mb-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-light text-lg font-semibold text-terracotta">
                            {partner.avatar}
                          </div>
                          {partner.isOnline && (
                            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card bg-sage" />
                          )}
                          {partner.isVerified && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sage text-white">
                              <svg
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <h3 className="text-lg font-semibold text-foreground">
                          {partner.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {partner.specialty}
                        </p>

                        {/* Rating */}
                        <div className="mt-3 flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-terracotta text-terracotta" />
                          <span className="text-sm font-medium text-foreground">
                            {partner.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({partner.reviews} đánh giá)
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                          <span className="text-sm text-muted-foreground">
                            Từ
                          </span>
                          <span className="font-semibold text-foreground">
                            {formatPrice(partner.pricePerHour)}/giờ
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
