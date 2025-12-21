'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  fadeInUp,
  slideInLeft,
  staggerContainer,
  imageReveal,
  premiumEase,
} from './shared';

export function ValueProposition() {
  return (
    <section className="overflow-hidden bg-cream py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Image */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <motion.div
              variants={imageReveal}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl"
            >
              <Image
                src="/hero.jpg"
                alt="Không gian trò chuyện ấm áp"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: premiumEase }}
              className="absolute -bottom-6 -right-6 max-w-xs rounded-2xl bg-background p-6 shadow-xl lg:-right-12"
            >
              <svg
                className="mb-3 h-8 w-8 text-terracotta/30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;Cogie giúp tôi tìm được người lắng nghe thực sự. Mỗi cuộc
                trò chuyện đều mang lại giá trị.&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium text-foreground">
                — Một người dùng Cogie
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:pl-8"
          >
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-terracotta"
            >
              <span className="h-px w-6 bg-terracotta" />
              Về Cogie
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Kết Nối Con Người
              <br />
              <span className="text-muted-foreground">Thấu Hiểu Tâm Hồn</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            >
              Trong thế giới số hóa, đôi khi chúng ta quên đi giá trị của những
              cuộc trò chuyện thực sự. Cogie ra đời với sứ mệnh kết nối những
              tâm hồn, mang đến không gian an toàn để bạn được lắng nghe.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-lg leading-relaxed text-muted-foreground"
            >
              Mỗi Partner của chúng tôi đều được xác minh và đào tạo để mang đến
              trải nghiệm tốt nhất cho bạn.
            </motion.p>

            {/* Key points */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {[
                { icon: '🛡️', text: 'An toàn & Bảo mật' },
                { icon: '✓', text: 'Partners được xác minh' },
                { icon: '🤝', text: 'Kết nối chân thành' },
                { icon: '⏰', text: 'Lịch hẹn linh hoạt' },
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta-light text-sm">
                    {point.icon}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {point.text}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: premiumEase }}
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-base font-medium text-terracotta transition-colors hover:text-terracotta-dark"
                >
                  Tìm hiểu thêm về chúng tôi
                  <svg
                    className="h-4 w-4"
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
