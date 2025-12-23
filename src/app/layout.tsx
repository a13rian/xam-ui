import type { Metadata } from 'next';
import {
  Be_Vietnam_Pro,
  Playfair_Display,
  Geist_Mono,
} from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryProvider, AuthInitializer } from '@/providers';
import { Toaster } from '@/shared/components/ui';
import './globals.css';

// Body font - Vietnamese-optimized sans-serif
const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-geist-sans',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
});

// Monospace font
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Display font - High-contrast serif matching Aescape aesthetic
const playfairDisplay = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Chuyện Xàm - Nơi tâm sự thăng hoa',
  description: 'Kết nối với những người bạn đồng hành đáng tin cậy. Trải nghiệm trò chuyện, tâm sự và hoạt động cùng nhau một cách an toàn và thoải mái.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${beVietnamPro.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <NuqsAdapter>
          <QueryProvider>
            <AuthInitializer>{children}</AuthInitializer>
            <Toaster />
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
