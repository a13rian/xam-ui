'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { benefits } from '../../constants';

export function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Tại sao chọn Cogie?
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Những Lợi Ích Dành Cho Partner
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Cogie mang đến môi trường lý tưởng để bạn phát triển sự nghiệp với sự linh hoạt và hỗ
            trợ tối đa.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.color} transition-transform group-hover:scale-110`}
              >
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
