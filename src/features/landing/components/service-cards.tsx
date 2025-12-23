'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionContainer } from './shared';
import {
  staggerContainer,
  fadeInUp,
  cardPress,
} from './shared/animation-variants';

const services = [
  {
    title: 'Trò Chuyện Nhẹ Nhàng',
    duration: 'Từ 1 giờ',
    price: 'Từ 100,000 VND',
    description:
      'Những cuộc trò chuyện thoải mái và kết nối chân thực. Hoàn hảo cho buổi cà phê hoặc đi dạo buổi tối.',
    image: '/images/service-casual.jpg',
    href: '/search?type=casual',
  },
  {
    title: 'Trò Chuyện Sâu Sắc',
    duration: 'Từ 2 giờ',
    price: 'Từ 180,000 VND',
    description:
      'Những cuộc đối thoại ý nghĩa về cuộc sống, mục tiêu và khát vọng. Dành cho những ai tìm kiếm chiều sâu.',
    image: '/images/service-deep.jpg',
    href: '/search?type=deep',
  },
  {
    title: 'Đồng Hành Hoạt Động',
    duration: 'Linh hoạt',
    price: 'Từ 150,000 VND',
    description:
      'Những trải nghiệm và cuộc phiêu lưu cùng nhau. Ăn uống, sự kiện, thể thao hoặc du lịch.',
    image: '/images/service-activity.jpg',
    href: '/search?type=activity',
  },
];

export function ServiceCards() {
  return (
    <SectionContainer background="cream" id="services">
      {/* Section Header */}
      <div className="mb-12 text-center lg:mb-16">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
          Trải Nghiệm Của Chúng Tôi
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-charcoal md:text-4xl lg:text-5xl">
          Tìm Người Đồng Hành Hoàn Hảo
        </h2>
      </div>

      {/* Cards Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={fadeInUp}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div
              variants={cardPress}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Duration & Price */}
                <div className="mb-3 flex items-center justify-between text-sm text-charcoal-light">
                  <span>{service.duration}</span>
                  <span className="font-medium text-charcoal">
                    {service.price}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-medium text-charcoal">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                  {service.description}
                </p>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-lavender-dark"
                >
                  Đặt Lịch
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
