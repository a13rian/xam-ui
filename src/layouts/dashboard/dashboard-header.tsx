'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/features/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import { LogOut, User, Menu, Search, Bell } from 'lucide-react';
import { useUIStore } from '@/stores';
import { ROUTES } from '@/shared/constants/routes';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 lg:hidden">
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

      {/* Search */}
      <div className="flex-1 flex items-center max-w-md">
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500" />
        </button>

        {/* User menu */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center text-sm font-medium text-white overflow-hidden">
                {user?.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.firstName || 'User avatar'}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  getUserInitials()
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName || 'User'}
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56 p-0">
            <div className="p-2">
              <div className="px-2 py-1.5 mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <div className="border-t border-gray-100 pt-1">
                <Link href={ROUTES.DASHBOARD.PROFILE}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
