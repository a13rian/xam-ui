'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
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
import { Logo } from '@/shared/components/brand';
import {
  premiumEase,
  menuItemStagger,
  scaleDownHover,
} from '@/features/landing/components/shared';

const navLinks = [
  { href: '/search', label: 'Khám Phá' },
  { href: '/#how-it-works', label: 'Cách Hoạt Động' },
  { href: '/#about', label: 'Về Chúng Tôi' },
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
    <header className="sticky top-0 z-50 w-full bg-cream/95 backdrop-blur-md supports-backdrop-filter:bg-cream/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Nav grouped together */}
        <div className="flex items-baseline gap-12">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: premiumEase }}
            >
              <Logo size="md" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-charcoal-light transition-colors duration-300 hover:text-charcoal"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-charcoal transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={isAuthenticated ? '/become-partner' : '/sign-in?callbackUrl=/become-partner'}
            className="text-sm font-medium text-charcoal-light transition-colors duration-300 hover:text-charcoal"
          >
            Trở Thành Đối Tác
          </Link>

          {isAuthenticated && user ? (
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-lavender/30 bg-cream-dark text-sm font-medium text-charcoal transition-all duration-300 hover:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2"
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
                className="w-72 rounded-2xl border-cream-dark bg-white/95 p-0 shadow-xl backdrop-blur-lg"
              >
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-cream-dark text-sm font-medium text-charcoal">
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
                      <p className="truncate text-sm font-semibold text-charcoal">
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user.firstName || 'User'}
                      </p>
                      <p className="truncate text-xs text-charcoal-light">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 border-t border-cream-dark pt-3">
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-charcoal-light hover:bg-cream hover:text-charcoal"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Bảng Điều Khiển
                      </Button>
                    </Link>
                    {isAdmin && (
                      <Link href={ROUTES.ADMIN.HOME}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm text-charcoal-light hover:bg-cream hover:text-charcoal"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Quản Trị
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-charcoal-light hover:bg-cream hover:text-charcoal"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Đăng Xuất
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <motion.div whileHover={scaleDownHover} whileTap={{ scale: 0.92 }}>
              <Link
                href="/sign-in"
                className="flex h-12 items-center justify-center rounded-[16px] bg-charcoal px-7 text-sm font-medium text-white transition-colors duration-300 hover:bg-charcoal/90"
              >
                Đăng Nhập
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream-dark lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-none bg-cream p-0 sm:max-w-md"
          >
            <div className="flex h-full flex-col px-6 py-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Logo size="md" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream-dark"
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
                      className="group flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-charcoal transition-colors hover:bg-cream-dark"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                      <ChevronRight className="h-5 w-5 text-charcoal-light transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-auto space-y-4 border-t border-cream-dark pt-6">
                <Link
                  href={isAuthenticated ? '/become-partner' : '/sign-in?callbackUrl=/become-partner'}
                  className="flex items-center justify-center rounded-full border-2 border-charcoal py-4 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Trở Thành Đối Tác
                </Link>

                {isAuthenticated && user ? (
                  <div className="rounded-2xl bg-cream-dark p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-medium text-charcoal">
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
                        <p className="truncate text-sm font-semibold text-charcoal">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.firstName || 'User'}
                        </p>
                        <p className="truncate text-xs text-charcoal-light">
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
                          className="w-full justify-start text-sm text-charcoal-light hover:bg-white hover:text-charcoal"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Bảng Điều Khiển
                        </Button>
                      </Link>
                      {isAdmin && (
                        <Link
                          href={ROUTES.ADMIN.HOME}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm text-charcoal-light hover:bg-white hover:text-charcoal"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Quản Trị
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-charcoal-light hover:bg-white hover:text-charcoal"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Đăng Xuất
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center rounded-full bg-charcoal py-4 text-sm font-medium text-white transition-colors hover:bg-charcoal/90"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Đăng Nhập
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
