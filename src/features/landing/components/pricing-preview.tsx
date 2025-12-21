'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { SectionHeader } from './shared';
import { fadeInUp, staggerContainer, cardHover, premiumEase } from './shared';

const pricingFeatures = [
  'Trò chuyện 1-1 với Partner',
  'Lịch hẹn linh hoạt theo ý bạn',
  'Partners đã được xác minh',
  'Hỗ trợ khách hàng 24/7',
  'Đánh giá và phản hồi sau buổi hẹn',
  'Thanh toán an toàn & bảo mật',
];

export function PricingPreview() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeader
              label="Giá cả"
              title="Minh Bạch &"
              subtitle="Hợp Lý"
              description="Partners tự đặt mức giá của họ. Bạn chỉ trả cho thời gian bạn sử dụng."
              className="mb-8"
            />

            <motion.ul variants={fadeInUp} className="space-y-4">
              {pricingFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage/20">
                    <Check className="h-3.5 w-3.5 text-sage" />
                  </span>
                  <span className="text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right - Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <motion.div
              whileHover={cardHover}
              transition={{ duration: 0.3, ease: premiumEase }}
              className="rounded-3xl bg-background p-8 shadow-xl lg:p-10"
            >
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-terracotta-light px-4 py-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-terracotta">
                  Bắt đầu từ
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="font-display text-5xl font-normal tracking-tight text-foreground lg:text-6xl">
                  100.000
                </span>
                <span className="ml-2 text-lg text-muted-foreground">
                  VND / giờ
                </span>
              </div>

              {/* Description */}
              <p className="mb-8 text-muted-foreground">
                Mức giá thay đổi tùy theo từng Partner. Khám phá profiles để tìm
                Partner phù hợp với ngân sách của bạn.
              </p>

              {/* CTA */}
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: premiumEase }}
              >
                <Link
                  href="/search"
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-terracotta text-base font-medium text-white shadow-lg shadow-terracotta/25 transition-colors hover:bg-terracotta-dark"
                >
                  Xem Các Partners
                  <svg
                    className="h-5 w-5"
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

              {/* Trust note */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Không có phí ẩn • Thanh toán sau buổi hẹn
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
