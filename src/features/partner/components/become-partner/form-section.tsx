'use client';

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Quote } from 'lucide-react';
import { PartnerRegisterForm } from '../partner-register-form';
import { PartnerStatusCard } from '../partner-status-card';
import { usePartnerAccountStatus } from '../../api';
import { testimonials } from '../../constants';
import { containerVariants, itemVariants, slideInLeft, slideInRight } from '../../lib/animations';

export const FormSection = forwardRef<HTMLDivElement>(function FormSection(_, ref) {
  const { data, isLoading } = usePartnerAccountStatus();

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-20 lg:py-24">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Left side - Info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-terracotta">
              <span className="h-px w-8 bg-terracotta/40" />
              Đăng ký Partner
            </span>
            <h2 className="mb-4 font-display text-3xl tracking-tight text-foreground">
              Sẵn Sàng Bắt Đầu Hành Trình?
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Điền thông tin bên dưới để gửi hồ sơ đăng ký. Đội ngũ Cogie sẽ xem xét và liên hệ
              lại trong vòng 24-48 giờ.
            </p>

            {/* Testimonials */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  variants={itemVariants}
                  className="rounded-2xl border border-border/50 bg-cream p-5"
                >
                  <Quote className="mb-3 h-5 w-5 text-terracotta/40" />
                  <p className="mb-4 text-sm italic leading-relaxed text-muted-foreground">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-light text-sm font-medium text-terracotta">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-4 py-2 text-sm text-sage">
                <Shield className="h-4 w-4" />
                Xác minh danh tính
              </div>
              <div className="flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta-light px-4 py-2 text-sm text-terracotta">
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
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-border/50 bg-background p-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-terracotta border-t-transparent" />
                  Đang tải...
                </div>
              </div>
            ) : data ? (
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-background shadow-lg">
                <PartnerStatusCard />
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-background shadow-lg">
                <PartnerRegisterForm />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});
