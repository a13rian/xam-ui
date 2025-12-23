'use client';

import { motion } from 'motion/react';
import { Shield, Users, Star, Clock } from 'lucide-react';
import { SectionContainer } from './shared';
import { staggerContainerFast, counterReveal } from './shared/animation-variants';

const stats = [
  {
    icon: Users,
    value: '50+',
    label: 'Đối Tác Xác Minh',
  },
  {
    icon: Shield,
    value: '10,000+',
    label: 'Kết Nối Ý Nghĩa',
  },
  {
    icon: Star,
    value: '98%',
    label: 'Tỷ Lệ Hài Lòng',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Hỗ Trợ Sẵn Sàng',
  },
];

export function TrustBar() {
  return (
    <SectionContainer
      background="cream-dark"
      spacing="small"
      className="border-y border-charcoal/5"
    >
      <motion.div
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={counterReveal}
            className="flex flex-col items-center text-center md:flex-row md:gap-4 md:text-left"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-lavender/20 md:mb-0">
              <stat.icon className="h-5 w-5 text-charcoal" />
            </div>
            <div>
              <p className="font-display text-2xl font-medium text-charcoal md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-charcoal-light md:text-sm">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
