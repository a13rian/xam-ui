"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
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
            href="/"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Home
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
            href="/partner"
            className="rounded-lg border border-gray-900 px-5 h-[46px] flex items-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Become a Partner
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg bg-gray-900 px-5 h-[46px] flex items-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Sign In
          </Link>
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
              href="/"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
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
                href="/partner"
                className="rounded-lg border border-gray-900 px-5 h-[46px] flex items-center justify-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Partner
              </Link>
              <Link
                href="/sign-in"
                className="rounded-lg bg-gray-900 px-5 h-[46px] flex items-center justify-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
