import {
  LayoutDashboard,
  Users,
  UserCircle,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes';

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
}

export interface AdminNavSection {
  title?: string;
  items: AdminNavItem[];
}

/**
 * Admin sidebar navigation items (flat list)
 */
export const adminNavItems: AdminNavItem[] = [
  {
    label: 'Dashboard',
    href: ROUTES.ADMIN.HOME,
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: ROUTES.ADMIN.USERS,
    icon: Users,
  },
  {
    label: 'Companions',
    href: ROUTES.ADMIN.COMPANIONS,
    icon: UserCircle,
  },
  {
    label: 'Bookings',
    href: ROUTES.ADMIN.BOOKINGS,
    icon: Calendar,
  },
  {
    label: 'Analytics',
    href: ROUTES.ADMIN.ANALYTICS,
    icon: BarChart3,
  },
  {
    label: 'Settings',
    href: ROUTES.ADMIN.SETTINGS,
    icon: Settings,
  },
];

/**
 * Admin navigation organized by sections
 */
export const adminNavSections: AdminNavSection[] = [
  {
    items: [
      {
        label: 'Dashboard',
        href: ROUTES.ADMIN.HOME,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Management',
    items: [
      {
        label: 'Users',
        href: ROUTES.ADMIN.USERS,
        icon: Users,
      },
      {
        label: 'Companions',
        href: ROUTES.ADMIN.COMPANIONS,
        icon: UserCircle,
      },
      {
        label: 'Bookings',
        href: ROUTES.ADMIN.BOOKINGS,
        icon: Calendar,
      },
    ],
  },
  {
    title: 'Insights',
    items: [
      {
        label: 'Analytics',
        href: ROUTES.ADMIN.ANALYTICS,
        icon: BarChart3,
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        label: 'Settings',
        href: ROUTES.ADMIN.SETTINGS,
        icon: Settings,
      },
      {
        label: 'Permissions',
        href: `${ROUTES.ADMIN.SETTINGS}/permissions`,
        icon: Shield,
        disabled: true,
      },
    ],
  },
];
