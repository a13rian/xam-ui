'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Lock, Bell, Mail } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const profileNavItems = [
  {
    href: '/profile',
    label: 'Thông tin cá nhân',
    icon: User,
  },
  {
    href: '/profile/security',
    label: 'Bảo mật',
    icon: Lock,
  },
  {
    href: '/profile/notifications',
    label: 'Thông báo',
    icon: Bell,
  },
  {
    href: '/profile/verification',
    label: 'Xác thực',
    icon: Mail,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {profileNavItems.map((item) => {
        // For /profile (main), exact match. For sub-routes, prefix match
        const isActive =
          item.href === '/profile'
            ? pathname === '/profile'
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-terracotta-light text-terracotta'
                : 'text-muted-foreground hover:bg-terracotta-light/50 hover:text-foreground'
            )}
          >
            <Icon
              className={cn(
                'h-5 w-5 transition-colors',
                isActive ? 'text-terracotta' : ''
              )}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
