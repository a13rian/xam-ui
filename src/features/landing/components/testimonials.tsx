'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui';
import { SectionHeader } from './shared';
import { premiumEase } from './shared';

const testimonials = [
  {
    id: '1',
    content:
      'Lần đầu tiên tôi cảm thấy được lắng nghe thực sự. Partner rất tâm lý và thấu hiểu. Tôi đã tìm được người để chia sẻ những điều không thể nói với ai.',
    author: 'Nguyễn Thị Hương',
    role: 'Nhân viên văn phòng',
    avatar: 'NH',
    rating: 5,
  },
  {
    id: '2',
    content:
      'Cogie đã thay đổi cách tôi nhìn nhận về việc tìm kiếm sự hỗ trợ. Không còn cảm giác ngại ngùng, mọi thứ diễn ra tự nhiên và thoải mái.',
    author: 'Trần Minh Đức',
    role: 'Doanh nhân',
    avatar: 'TM',
    rating: 5,
  },
  {
    id: '3',
    content:
      'Tôi đã thử nhiều ứng dụng khác nhưng Cogie là nơi duy nhất mang lại cảm giác kết nối thực sự. Partners ở đây rất chuyên nghiệp.',
    author: 'Lê Thu Hà',
    role: 'Sinh viên',
    avatar: 'LT',
    rating: 5,
  },
  {
    id: '4',
    content:
      'Mỗi cuộc hẹn đều là một trải nghiệm đáng nhớ. Tôi học được nhiều điều về bản thân thông qua những cuộc trò chuyện với Partner.',
    author: 'Phạm Văn Long',
    role: 'Kỹ sư phần mềm',
    avatar: 'PV',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Đánh giá"
          title="Khách Hàng Nói Gì"
          subtitle="Về Cogie"
          description="Hàng nghìn người đã tin tưởng và trải nghiệm dịch vụ của chúng tôi."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: premiumEase }}
                    className="h-full"
                  >
                    <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6">
                      {/* Rating */}
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-terracotta text-terracotta"
                            />
                          )
                        )}
                      </div>

                      {/* Quote */}
                      <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-6">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-light text-sm font-semibold text-terracotta"
                          data-testid="testimonial-avatar"
                        >
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {testimonial.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
