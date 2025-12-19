'use client';

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Shield, Clock } from 'lucide-react';
import { PartnerRegisterForm } from '../partner-register-form';
import { PartnerStatusCard } from '../partner-status-card';
import { usePartnerAccountStatus } from '../../api';
import { testimonials } from '../../constants';

export const FormSection = forwardRef<HTMLDivElement>(function FormSection(_, ref) {
  const { data, isLoading } = usePartnerAccountStatus();

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-100 to-amber-50 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Đăng ký Partner
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Sẵn Sàng Bắt Đầu Hành Trình?
            </h2>
            <p className="mb-8 text-gray-600">
              Điền thông tin bên dưới để gửi hồ sơ đăng ký. Đội ngũ Cogie sẽ xem xét và liên hệ
              lại trong vòng 24-48 giờ.
            </p>

            {/* Testimonials */}
            <div className="space-y-4">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
                  <p className="mb-4 text-sm italic text-gray-600">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${testimonial.color} text-sm font-semibold text-gray-700`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
                <Shield className="h-4 w-4" />
                Xác minh danh tính
              </div>
              <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
                <Clock className="h-4 w-4" />
                Phản hồi trong 24h
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {isLoading ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-8 shadow-xl">
                <div className="flex items-center gap-3 text-gray-500">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                  Đang tải...
                </div>
              </div>
            ) : data ? (
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                <PartnerStatusCard />
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
                <PartnerRegisterForm />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});
