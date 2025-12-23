'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';
import { SectionContainer } from './shared';
import { premiumEase } from './shared/animation-variants';

const testimonials = [
  {
    id: 1,
    quote:
      'Cogie đã giúp tôi tìm được những cuộc trò chuyện chân thực khi tôi cần nhất. Các đối tác rất chu đáo, nhiệt tình và thực sự quan tâm đến việc tạo ra những kết nối ý nghĩa.',
    author: 'Thanh Nguyễn',
    role: 'Quản Lý Marketing',
    avatar: '/images/testimonial-1.jpg',
  },
  {
    id: 2,
    quote:
      'Là người thường xuyên đi công tác, việc có những người đồng hành đáng tin cậy ở các thành phố khác nhau thực sự vô giá. Chất lượng đối tác trên nền tảng này rất xuất sắc.',
    author: 'Minh Lê',
    role: 'Tư Vấn Kinh Doanh',
    avatar: '/images/testimonial-2.jpg',
  },
  {
    id: 3,
    quote:
      'Tôi đã hoài nghi lúc đầu, nhưng quy trình xác minh đã cho tôi sự tự tin. Mọi buổi gặp đều chuyên nghiệp, thú vị và đúng như những gì tôi tìm kiếm.',
    author: 'Hoa Trần',
    role: 'Kỹ Sư Phần Mềm',
    avatar: '/images/testimonial-3.jpg',
  },
  {
    id: 4,
    quote:
      'Nền tảng được thiết kế đẹp và dễ sử dụng. Tìm kiếm đối tác cùng sở thích về nghệ thuật và văn hóa chưa bao giờ dễ dàng đến thế.',
    author: 'Đức Phạm',
    role: 'Giám Đốc Nghệ Thuật',
    avatar: '/images/testimonial-4.jpg',
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <SectionContainer background="cream-dark" spacing="large">
      <div className="mx-auto max-w-4xl text-center">
        {/* Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-lavender/20"
        >
          <Quote className="h-8 w-8 text-lavender-dark" />
        </motion.div>

        {/* Testimonial Content */}
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: premiumEase }}
            >
              <blockquote className="font-display text-xl font-medium leading-relaxed text-charcoal md:text-2xl lg:text-3xl">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-cream">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-charcoal">
                    {currentTestimonial.author}
                  </p>
                  <p className="text-sm text-charcoal-light">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-charcoal'
                  : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
