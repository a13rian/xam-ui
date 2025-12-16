'use client';

import { Heart, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants';

export default function FavoritesPage() {
  // TODO: Replace with actual data from useFavorites hook
  const favorites: unknown[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your saved companions for quick access.
        </p>
      </div>

      {/* Favorites grid */}
      {favorites.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-gray-100 p-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No favorites yet
            </h3>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Save your favorite companions to easily find them later and book
              faster.
            </p>
            <Link href={ROUTES.SEARCH}>
              <Button className="mt-6">
                <Search className="mr-2 h-4 w-4" />
                Explore Companions
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Favorite companion cards would go here */}
        </div>
      )}
    </div>
  );
}
