import {
  LayoutDashboard,
  Calendar,
  Wallet,
  User,
  Settings,
  Heart,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

/**
 * Dashboard sidebar navigation items
 */
export const dashboardNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD.HOME,
    icon: LayoutDashboard,
  },
  {
    label: 'Bookings',
    href: ROUTES.DASHBOARD.BOOKINGS,
    icon: Calendar,
  },
  {
    label: 'Wallet',
    href: ROUTES.DASHBOARD.WALLET,
    icon: Wallet,
  },
  {
    label: 'Favorites',
    href: ROUTES.DASHBOARD.FAVORITES,
    icon: Heart,
  },
  {
    label: 'Profile',
    href: ROUTES.DASHBOARD.PROFILE,
    icon: User,
  },
  {
    label: 'Settings',
    href: ROUTES.DASHBOARD.SETTINGS,
    icon: Settings,
  },
];

/**
 * Dashboard navigation organized by sections
 */
export const dashboardNavSections: NavSection[] = [
  {
    items: [
      {
        label: 'Dashboard',
        href: ROUTES.DASHBOARD.HOME,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Activity',
    items: [
      {
        label: 'Bookings',
        href: ROUTES.DASHBOARD.BOOKINGS,
        icon: Calendar,
      },
      {
        label: 'Wallet',
        href: ROUTES.DASHBOARD.WALLET,
        icon: Wallet,
      },
      {
        label: 'Favorites',
        href: ROUTES.DASHBOARD.FAVORITES,
        icon: Heart,
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        label: 'Profile',
        href: ROUTES.DASHBOARD.PROFILE,
        icon: User,
      },
      {
        label: 'Settings',
        href: ROUTES.DASHBOARD.SETTINGS,
        icon: Settings,
      },
    ],
  },
];
