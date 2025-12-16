'use client';

import { useUser } from '@/stores';
import {
  Calendar,
  Wallet,
  Heart,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

// Placeholder stats - these would come from API
const stats = [
  {
    label: 'Total Bookings',
    value: '12',
    change: '+2 this month',
    icon: Calendar,
    href: ROUTES.DASHBOARD.BOOKINGS,
  },
  {
    label: 'Wallet Balance',
    value: '$250.00',
    change: 'Available',
    icon: Wallet,
    href: ROUTES.DASHBOARD.WALLET,
  },
  {
    label: 'Favorites',
    value: '8',
    change: 'Companions saved',
    icon: Heart,
    href: ROUTES.DASHBOARD.FAVORITES,
  },
];

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s what&apos;s happening with your account.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{stat.change}</p>
                </div>
                <div className="rounded-lg bg-orange-100 p-3">
                  <Icon className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowRight className="h-5 w-5 text-orange-500" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent activity section */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Bookings
            </h2>
            <Link
              href={ROUTES.DASHBOARD.BOOKINGS}
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="p-6">
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-gray-100 p-3">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-900">
              No recent bookings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start exploring companions to make your first booking.
            </p>
            <Link
              href={ROUTES.SEARCH}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
            >
              <TrendingUp className="h-4 w-4" />
              Explore Companions
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href={ROUTES.SEARCH}
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-orange-200 hover:bg-orange-50"
          >
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">
              Find Companions
            </span>
          </Link>
          <Link
            href={ROUTES.DASHBOARD.WALLET}
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-orange-200 hover:bg-orange-50"
          >
            <Wallet className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">
              Add Funds
            </span>
          </Link>
          <Link
            href={ROUTES.DASHBOARD.PROFILE}
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-orange-200 hover:bg-orange-50"
          >
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">
              Edit Profile
            </span>
          </Link>
          <Link
            href={ROUTES.DASHBOARD.SETTINGS}
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-orange-200 hover:bg-orange-50"
          >
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">
              Settings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
