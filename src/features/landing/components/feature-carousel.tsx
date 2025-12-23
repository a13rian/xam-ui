'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionContainer } from './shared';
import { premiumEase, scaleDownHover } from './shared/animation-variants';

const features = [
  {
    title: 'Đối Tác Xác Minh',
    subtitle: 'An Toàn Là Ưu Tiên',
    description:
      'Mỗi đối tác đều trải qua quy trình xác minh nghiêm ngặt bao gồm kiểm tra danh tính, sàng lọc lý lịch và phỏng vấn cá nhân để đảm bảo an toàn cho bạn.',
    image: '/images/feature-verified.jpg',
  },
  {
    title: 'Lịch Trình Linh Hoạt',
    subtitle: 'Đặt Lịch Mọi Lúc, Mọi Nơi',
    description:
      'Duyệt qua các đối tác sẵn sàng, kiểm tra lịch trình và đặt buổi hẹn phù hợp với lối sống của bạn. Dễ dàng đổi lịch hoặc hủy bỏ.',
    image: '/images/feature-schedule.jpg',
  },
  {
    title: 'Thanh Toán An Toàn',
    subtitle: 'Giao Dịch Bảo Mật',
    description:
      'Tất cả thanh toán được xử lý an toàn qua nền tảng của chúng tôi. Thông tin tài chính của bạn được bảo vệ với mã hóa cấp ngân hàng.',
    image: '/images/feature-payment.jpg',
  },
];

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const currentFeature = features[currentIndex];

  return (
    <SectionContainer background="cream-dark" id="features">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="absolute inset-0"
            >
              <Image
                src={currentFeature.image}
                alt={currentFeature.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 lg:col-start-8">
          {/* Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <span className="text-sm text-charcoal-light">
              {currentIndex + 1} / {features.length}
            </span>
            <div className="flex gap-2">
              <motion.button
                onClick={goToPrevious}
                whileHover={scaleDownHover}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:bg-charcoal hover:text-white"
                aria-label="Previous feature"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={goToNext}
                whileHover={scaleDownHover}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:bg-charcoal hover:text-white"
                aria-label="Next feature"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Feature Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: premiumEase }}
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-lavender-dark">
                {currentFeature.subtitle}
              </p>
              <h3 className="font-display text-2xl font-medium text-charcoal md:text-3xl lg:text-4xl">
                {currentFeature.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light md:text-lg">
                {currentFeature.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="mt-8 flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-charcoal'
                    : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
