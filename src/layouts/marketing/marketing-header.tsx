'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/features/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import { LogOut, User, Shield } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes';

export function MarketingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  // Check if user is admin
  const isAdmin = user?.roles?.some((role) =>
    role.name.toLowerCase().includes('admin')
  );

  const partnerHref = isAuthenticated
    ? '/become-partner'
    : '/sign-in?callbackUrl=/become-partner';

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
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/search"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Pricing
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={partnerHref}
            className="rounded-full border border-gray-900 px-5 h-[40px] flex items-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Become a Partner
          </Link>
          {isAuthenticated && user ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="rounded-full w-[40px] h-[40px] flex items-center justify-center text-sm font-medium text-white bg-gray-900 transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 overflow-hidden"
                  aria-label="User menu"
                >
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.firstName || 'User avatar'}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  ) : (
                    getUserInitials()
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-0">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium text-white bg-gray-900 overflow-hidden">
                      {user.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.firstName || 'User avatar'}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        getUserInitials()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user.firstName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 space-y-1">
                    <Link href="/account/profile">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    {isAdmin && (
                      <Link href={ROUTES.ADMIN.HOME}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-full bg-gray-900 px-5 h-[40px] flex items-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <Link
              href="/search"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-3 border-t border-gray-200 flex flex-col gap-3">
              <Link
                href={partnerHref}
                className="rounded-full border border-gray-900 px-5 h-[40px] flex items-center justify-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Partner
              </Link>
              {isAuthenticated && user ? (
                <div className="px-5 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium text-white bg-gray-900 overflow-hidden relative">
                      {user.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.firstName || 'User avatar'}
                          fill
                          className="object-cover"
                          sizes="40px"
                          unoptimized
                        />
                      ) : (
                        getUserInitials()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user.firstName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/account/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link
                      href={ROUTES.ADMIN.HOME}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="rounded-full bg-gray-900 px-5 h-[40px] flex items-center justify-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
