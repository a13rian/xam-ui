'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/features/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { LogOut, User, Shield, Menu, X, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import {
  aescapeEase,
  menuItemStagger,
  scaleDownHover,
} from '@/features/landing/components/shared';

const navLinks = [
  { href: '/search', label: 'Discover' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export function MarketingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isAdmin = user?.roles?.some((role) =>
    role.name.toLowerCase().includes('admin')
  );

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
    <header className="sticky top-0 z-50 w-full bg-aescape-cream/95 backdrop-blur-md supports-backdrop-filter:bg-aescape-cream/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.span
            className="font-display text-2xl font-medium tracking-tight text-aescape-charcoal"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: aescapeEase }}
          >
            Cogie
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-aescape-charcoal-light transition-colors duration-300 hover:text-aescape-charcoal"
            >
              {link.label}
              {/* Animated underline */}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-aescape-charcoal transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={isAuthenticated ? '/become-partner' : '/sign-in?callbackUrl=/become-partner'}
            className="text-sm font-medium text-aescape-charcoal-light transition-colors duration-300 hover:text-aescape-charcoal"
          >
            Become a Partner
          </Link>

          {isAuthenticated && user ? (
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-aescape-lavender/30 bg-aescape-cream-dark text-sm font-medium text-aescape-charcoal transition-all duration-300 hover:border-aescape-lavender focus:outline-none focus:ring-2 focus:ring-aescape-lavender focus:ring-offset-2"
                  whileHover={scaleDownHover}
                  aria-label="User menu"
                >
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.firstName || 'User avatar'}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    getUserInitials()
                  )}
                </motion.button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-72 rounded-2xl border-aescape-cream-dark bg-white/95 p-0 shadow-xl backdrop-blur-lg"
              >
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-aescape-cream-dark text-sm font-medium text-aescape-charcoal">
                      {user.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.firstName || 'User avatar'}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        getUserInitials()
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-aescape-charcoal">
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user.firstName || 'User'}
                      </p>
                      <p className="truncate text-xs text-aescape-charcoal-light">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 border-t border-aescape-cream-dark pt-3">
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-aescape-charcoal-light hover:bg-aescape-cream hover:text-aescape-charcoal"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    {isAdmin && (
                      <Link href={ROUTES.ADMIN.HOME}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm text-aescape-charcoal-light hover:bg-aescape-cream hover:text-aescape-charcoal"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-aescape-charcoal-light hover:bg-aescape-cream hover:text-aescape-charcoal"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <motion.div whileHover={scaleDownHover} whileTap={{ scale: 0.92 }}>
              <Link
                href="/sign-in"
                className="flex h-11 items-center justify-center rounded-full bg-aescape-charcoal px-7 text-sm font-medium text-white transition-colors duration-300 hover:bg-aescape-charcoal/90"
              >
                Sign In
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-aescape-charcoal transition-colors hover:bg-aescape-cream-dark lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-none bg-aescape-cream p-0 sm:max-w-md"
          >
            <div className="flex h-full flex-col px-6 py-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="font-display text-2xl font-medium tracking-tight text-aescape-charcoal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cogie
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-aescape-charcoal transition-colors hover:bg-aescape-cream-dark"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="mt-10 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={menuItemStagger}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-aescape-charcoal transition-colors hover:bg-aescape-cream-dark"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                      <ChevronRight className="h-5 w-5 text-aescape-charcoal-light transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-auto space-y-4 border-t border-aescape-cream-dark pt-6">
                <Link
                  href={isAuthenticated ? '/become-partner' : '/sign-in?callbackUrl=/become-partner'}
                  className="flex items-center justify-center rounded-full border-2 border-aescape-charcoal py-4 text-sm font-medium text-aescape-charcoal transition-colors hover:bg-aescape-charcoal hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Become a Partner
                </Link>

                {isAuthenticated && user ? (
                  <div className="rounded-2xl bg-aescape-cream-dark p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-medium text-aescape-charcoal">
                        {user.avatarUrl ? (
                          <Image
                            src={user.avatarUrl}
                            alt={user.firstName || 'User avatar'}
                            fill
                            className="object-cover"
                            sizes="48px"
                            unoptimized
                          />
                        ) : (
                          getUserInitials()
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-aescape-charcoal">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.firstName || 'User'}
                        </p>
                        <p className="truncate text-xs text-aescape-charcoal-light">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm text-aescape-charcoal-light hover:bg-white hover:text-aescape-charcoal"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                      {isAdmin && (
                        <Link
                          href={ROUTES.ADMIN.HOME}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm text-aescape-charcoal-light hover:bg-white hover:text-aescape-charcoal"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Panel
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-aescape-charcoal-light hover:bg-white hover:text-aescape-charcoal"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center rounded-full bg-aescape-charcoal py-4 text-sm font-medium text-white transition-colors hover:bg-aescape-charcoal/90"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
