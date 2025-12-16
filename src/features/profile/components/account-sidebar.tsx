'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Lock, Bell, Mail } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const accountNavItems = [
  {
    href: '/account/profile',
    label: 'Thông tin cá nhân',
    icon: User,
  },
  {
    href: '/account/security',
    label: 'Bảo mật',
    icon: Lock,
  },
  {
    href: '/account/notifications',
    label: 'Thông báo',
    icon: Bell,
  },
  {
    href: '/account/verification',
    label: 'Xác thực',
    icon: Mail,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {accountNavItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm',
              isActive
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
