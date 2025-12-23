'use client';

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Quote } from 'lucide-react';
import {
  SectionContainer,
  staggerContainer,
  fadeInUp,
  slideInLeft,
  slideInRight,
} from '@/features/landing/components/shared';
import { PartnerRegisterForm } from '../partner-register-form';
import { PartnerStatusCard } from '../partner-status-card';
import { usePartnerAccountStatus } from '../../api';
import { testimonials } from '../../constants';

export const FormSection = forwardRef<HTMLDivElement>(function FormSection(
  _,
  ref
) {
  const { data, isLoading } = usePartnerAccountStatus();

  return (
    <SectionContainer background="white" id="register">
      <div ref={ref} className="grid items-start gap-12 lg:grid-cols-5">
        {/* Left side - Info */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
            Đăng Ký Đối Tác
          </p>
          <h2 className="mb-4 font-display text-3xl font-medium tracking-tight text-charcoal md:text-4xl">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="mb-8 leading-relaxed text-charcoal-light">
            Điền thông tin bên dưới để gửi hồ sơ đăng ký. Đội ngũ Cogie sẽ xem
            xét và liên hệ lại trong vòng 24-48 giờ.
          </p>

          {/* Testimonials */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                className="rounded-2xl border border-charcoal/5 bg-cream p-5"
              >
                <Quote className="mb-3 h-5 w-5 text-lavender/60" />
                <p className="mb-4 text-sm italic leading-relaxed text-charcoal-light">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender/20 text-sm font-medium text-lavender-dark">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-charcoal">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-charcoal-light">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-4 py-2 text-sm text-lavender-dark">
              <Shield className="h-4 w-4" />
              Xác minh danh tính
            </div>
            <div className="flex items-center gap-2 rounded-full border border-charcoal/10 bg-cream px-4 py-2 text-sm text-charcoal">
              <Clock className="h-4 w-4" />
              Phản hồi trong 24h
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-charcoal/5 bg-cream p-8">
              <div className="flex items-center gap-3 text-charcoal-light">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-lavender-dark border-t-transparent" />
                Đang tải...
              </div>
            </div>
          ) : data ? (
            <div className="overflow-hidden rounded-2xl border border-charcoal/5 bg-cream shadow-lg">
              <PartnerStatusCard />
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-charcoal/5 bg-cream shadow-lg">
              <PartnerRegisterForm />
            </div>
          )}
        </motion.div>
      </div>
    </SectionContainer>
  );
});
