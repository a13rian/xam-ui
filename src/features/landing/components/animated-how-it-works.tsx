'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { SectionHeader } from './shared';
import { fadeInUp, staggerContainer, premiumEase } from './shared';

const steps = [
  {
    number: '01',
    title: 'Đăng Ký Tài Khoản',
    description: 'Tạo tài khoản miễn phí chỉ trong 1 phút với email hoặc số điện thoại.',
  },
  {
    number: '02',
    title: 'Tìm Kiếm Partner',
    description: 'Duyệt qua các hồ sơ đã được xác minh và tìm người phù hợp với bạn.',
  },
  {
    number: '03',
    title: 'Đặt Lịch Hẹn',
    description: 'Chọn thời gian và địa điểm phù hợp với lịch trình của cả hai.',
  },
  {
    number: '04',
    title: 'Gặp Gỡ & Chia Sẻ',
    description: 'Tận hưởng cuộc trò chuyện ý nghĩa và kết nối thực sự.',
  },
];

export function AnimatedHowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Content */}
          <div className="lg:sticky lg:top-24">
            <SectionHeader
              label="Cách thức"
              title="Bắt Đầu Thật"
              subtitle="Dễ Dàng"
              description="Chỉ với vài bước đơn giản, bạn đã có thể bắt đầu hành trình kết nối với những người bạn tâm giao."
            />
          </div>

          {/* Right - Timeline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-px bg-border lg:left-5" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative pl-12 lg:pl-14"
                >
                  {/* Number circle */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.2 + index * 0.15,
                      duration: 0.5,
                      ease: premiumEase,
                    }}
                    className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-terracotta bg-background text-xs font-semibold text-terracotta lg:h-10 lg:w-10 lg:text-sm"
                  >
                    {step.number}
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3, ease: premiumEase }}
                    className="rounded-2xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
