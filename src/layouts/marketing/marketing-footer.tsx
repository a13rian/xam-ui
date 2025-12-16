'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';
import { cn } from '@/shared/lib/utils';

const newsletterSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

function FooterAccordion({ section }: { section: FooterSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 md:border-none py-4 md:py-0">
      <h3 className="text-white text-sm font-medium">
        <button
          className="flex items-center justify-between gap-5 w-full md:pointer-events-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="text-left">{section.title}</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform duration-200 md:hidden',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </h3>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 md:overflow-visible',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
        )}
      >
        <ul className="mt-4 space-y-2 pb-2 text-sm font-light text-white">
          {section.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="opacity-70 hover:opacity-100 transition-opacity inline-flex items-center group"
              >
                <span
                  aria-hidden="true"
                  className="transition-all duration-200 -translate-x-full inline-block mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                >
                  —
                </span>
                <span className="inline-block transition-all duration-200 -translate-x-4 group-hover:translate-x-0">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: NewsletterFormValues) {
    console.log(data);
    form.reset();
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-8 md:py-14 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="md:grid grid-cols-12 gap-4">
          {/* Newsletter Section */}
          <div className="col-span-7 flex flex-col md:flex-row md:items-end gap-5">
            <div className="w-full lg:max-w-md">
              <h2 className="text-base lg:text-sm text-center lg:text-left">
                Get updates you&apos;ll actually want—new features, special offers, and more.
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 lg:mt-8 lg:max-w-md"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="h-12 px-8 bg-white text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-transform duration-300 hover:scale-95"
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="col-span-5 md:pl-5 flex flex-col justify-end mt-8 md:mt-0">
            <h2 className="text-sm hidden md:block">Follow us</h2>
            <ul className="mt-8 md:mt-4 flex justify-between md:justify-start flex-wrap gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Go to ${social.label}`}
                    className="w-14 h-14 md:w-12 md:h-12 rounded-2xl group transition-all duration-300 flex items-center justify-center hover:scale-110 bg-white/10 hover:bg-white"
                  >
                    <span className="transition-all duration-300 group-hover:invert">
                      {social.icon}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Footer Navigation"
          className="mt-10 md:pt-10 border-t md:grid grid-cols-4 gap-4 overflow-hidden border-white/10"
        >
          {footerSections.map((section) => (
            <FooterAccordion key={section.title} section={section} />
          ))}
        </nav>

        {/* Bottom Bar */}
        <div className="mt-6 lg:mt-14 px-6 pt-6 md:pt-4 pb-4 lg:py-5 rounded-2xl lg:flex items-center gap-5 justify-between text-center lg:text-left bg-white/5">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill="currentColor"
              />
            </svg>
            <span className="text-xl font-semibold">Cogie</span>
          </Link>

          {/* Legal Links */}
          <ul className="flex items-center lg:justify-start justify-center gap-2 md:gap-4 mt-4 md:mt-0 text-sm font-light">
            <li className="flex items-center gap-2 md:gap-4">
              <Link href="/privacy" className="opacity-60 hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
            </li>
            <li className="flex items-center gap-2 md:gap-4">
              <span className="opacity-60">|</span>
              <Link href="/terms" className="opacity-60 hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
            </li>
          </ul>

          {/* Copyright */}
          <div className="text-sm font-light mt-4 md:mt-0">
            <p>Copyright &copy; Cogie Inc. {currentYear}</p>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="absolute bottom-4 md:bottom-auto md:top-0 md:-translate-y-1/2 right-4 md:right-12 w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-95 bg-white text-gray-900 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 12 12"
            className="w-3.5 h-auto -rotate-90"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M11 6.001H1M6 1l5 5-5 5"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
