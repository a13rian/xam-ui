'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Users, Calendar, Shield, CreditCard } from 'lucide-react';
import { SectionHeader } from './shared';
import { fadeInUp, staggerContainer, cardHover, premiumEase } from './shared';

const features = [
  {
    icon: Users,
    title: 'Kết Nối Thông Minh',
    description:
      'Hệ thống matching thông minh giúp bạn tìm được người phù hợp dựa trên sở thích và chủ đề quan tâm.',
  },
  {
    icon: Calendar,
    title: 'Đặt Lịch Linh Hoạt',
    description:
      'Dễ dàng đặt lịch hẹn gặp mặt với lịch trình linh hoạt, phù hợp với thời gian của cả hai bên.',
  },
  {
    icon: Shield,
    title: 'An Toàn & Tin Cậy',
    description:
      'Tất cả Partners đều được xác minh danh tính. Hệ thống đánh giá giúp bạn an tâm khi kết nối.',
  },
  {
    icon: CreditCard,
    title: 'Thanh Toán Bảo Mật',
    description:
      'Giao dịch được mã hóa SSL. Thanh toán sau buổi hẹn, minh bạch và không có phí ẩn.',
  },
];

export function AnimatedFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-cream py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Tính năng"
          title="Trải Nghiệm Kết Nối"
          subtitle="Hoàn Toàn Mới"
          description="Cogie cung cấp những tính năng thông minh giúp bạn kết nối dễ dàng, an toàn và hiệu quả."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={cardHover}
                transition={{ duration: 0.3, ease: premiumEase }}
                className="rounded-2xl border border-border/50 bg-background p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-light">
                  <Icon className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
