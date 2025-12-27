'use client';

import { motion } from 'motion/react';
import { Clock, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, cardPress } from '@/features/landing';
import { formatPrice } from '../../utils/format-price';

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  durationMinutes: number;
}

interface CompanionServicesProps {
  services: Service[];
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} phút`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} giờ`;
  }
  return `${hours} giờ ${mins} phút`;
}

export function CompanionServices({ services }: CompanionServicesProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Section Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-6"
      >
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
          Dịch Vụ
        </p>
        <h2 className="font-display text-xl md:text-2xl font-medium text-charcoal">
          Trải Nghiệm Đồng Hành
        </h2>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-4 md:grid-cols-2"
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={fadeInUp}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div
              variants={cardPress}
              className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="p-5">
                {/* Duration & Price */}
                <div className="flex items-center justify-between text-sm text-charcoal-light mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    <span>{formatDuration(service.durationMinutes)}</span>
                  </div>
                  <span className="font-semibold text-charcoal">
                    {formatPrice(service.price, service.currency)}
                  </span>
                </div>

                {/* Service Name */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="shrink-0 p-2 bg-lavender/20 rounded-xl">
                    <Sparkles className="size-4 text-lavender-dark" />
                  </div>
                  <h3 className="font-display text-base font-medium text-charcoal pt-0.5">
                    {service.name}
                  </h3>
                </div>

                {/* Description */}
                {service.description && (
                  <p className="text-sm leading-relaxed text-charcoal-light line-clamp-2">
                    {service.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
