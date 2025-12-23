'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { ArrowUp, Check, Loader2 } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { scaleDownHover } from '@/features/landing/components/shared';
import { Logo } from '@/shared/components/brand';

const newsletterSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Vui lòng nhập email hợp lệ'),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Trải Nghiệm',
    links: [
      { label: 'Khám Phá Đối Tác', href: '/search' },
      { label: 'Cách Hoạt Động', href: '/#how-it-works' },
      { label: 'Bảng Giá', href: '/#services' },
      { label: 'Thẻ Quà Tặng', href: '/gifts' },
    ],
  },
  {
    title: 'Đối Tác',
    links: [
      { label: 'Trở Thành Đối Tác', href: '/become-partner' },
      { label: 'Tài Nguyên Đối Tác', href: '/partner-resources' },
      { label: 'Câu Chuyện Thành Công', href: '/success-stories' },
    ],
  },
  {
    title: 'Công Ty',
    links: [
      { label: 'Về Chúng Tôi', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Tuyển Dụng', href: '/careers' },
      { label: 'Báo Chí', href: '/press' },
    ],
  },
  {
    title: 'Hỗ Trợ',
    links: [
      { label: 'Trung Tâm Trợ Giúp', href: '/help' },
      { label: 'Liên Hệ', href: '/contact' },
      { label: 'Câu Hỏi Thường Gặp', href: '/#faq' },
    ],
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: NewsletterFormValues) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsLoading(false);
    setIsSubmitted(true);
    form.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-footer-bg text-footer-text">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Headline */}
            <div>
              <h2 className="font-display text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl">
                Cập Nhật Mới Nhất
              </h2>
              <p className="mt-4 text-base text-white/60 lg:text-lg">
                Nhận thông tin về đối tác mới, tính năng và ưu đãi độc quyền.
              </p>
            </div>

            {/* Form */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-4 text-sm font-medium text-white"
              >
                <Check className="h-5 w-5 text-green-400" />
                Cảm ơn bạn đã đăng ký!
              </motion.div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email của bạn"
                            className="h-14 rounded-full border-white/20 bg-white/10 px-6 text-white placeholder:text-white/50 focus:border-lavender focus:ring-lavender"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="ml-4 text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="flex h-14 items-center justify-center rounded-full bg-lavender px-8 text-sm font-medium text-charcoal transition-colors hover:bg-lavender-dark disabled:cursor-not-allowed disabled:opacity-50"
                    whileHover={scaleDownHover}
                    whileTap={{ scale: 0.92 }}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Đăng Ký'
                    )}
                  </motion.button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Navigation - Desktop */}
        <div className="hidden gap-8 md:grid md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-white">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Navigation - Mobile Accordion */}
        <Accordion type="single" collapsible className="md:hidden">
          {footerSections.map((section) => (
            <AccordionItem
              key={section.title}
              value={section.title}
              className="border-white/10"
            >
              <AccordionTrigger className="py-4 text-sm font-medium text-white hover:no-underline">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pb-4 text-sm">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Social Links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 md:flex-row">
          <ul className="flex gap-4">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all duration-300 hover:bg-lavender hover:text-charcoal"
                  whileHover={scaleDownHover}
                >
                  {social.icon}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          {/* Logo */}
          <Link href="/">
            <Logo size="lg" variant="withTagline" inverted />
          </Link>

          {/* Legal Links */}
          <ul className="flex items-center gap-6 text-sm text-white/50">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-white">
                Chính Sách Bảo Mật
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-white">
                Điều Khoản Dịch Vụ
              </Link>
            </li>
            <li>
              <Link
                href="/accessibility"
                className="transition-colors hover:text-white"
              >
                Hỗ Trợ Tiếp Cận
              </Link>
            </li>
          </ul>

          {/* Copyright */}
          <p className="text-sm text-white/50">
            &copy; {currentYear} Chuyện Xàm. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute -top-6 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-lavender text-charcoal shadow-lg transition-colors hover:bg-lavender-dark md:right-8"
        whileHover={scaleDownHover}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
}
