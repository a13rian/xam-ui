'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { steps } from '../../constants';

export function StepsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Quy trình đăng ký
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">4 Bước Để Bắt Đầu</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Quy trình đơn giản, nhanh chóng để bạn trở thành Partner Cogie.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-orange-200 via-orange-300 to-orange-200 lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-bold text-white shadow-lg">
                    {step.number}
                  </div>
                  <div className="mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                    <step.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
