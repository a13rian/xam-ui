import type { Metadata } from 'next';
import { Geist, Geist_Mono, DM_Serif_Display } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryProvider, AuthInitializer } from '@/providers';
import { Toaster } from '@/shared/components/ui';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  weight: '400',
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
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} antialiased`}
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
