'use client';

import Link from 'next/link';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export function CompanionHeader() {
  return (
    <header className="bg-white/95 backdrop-blur border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Quay lại
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
