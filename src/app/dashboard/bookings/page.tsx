'use client';

import { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants';

type BookingStatus = 'all' | 'upcoming' | 'completed' | 'cancelled';

const statusTabs: { value: BookingStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Replace with actual data from useBookings hook
  const bookings: unknown[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track all your companion bookings.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status tabs */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and filter */}
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Bookings list */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-gray-100 p-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No bookings found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              {activeTab === 'all'
                ? "You haven't made any bookings yet. Start exploring companions to make your first booking."
                : `You don't have any ${activeTab} bookings.`}
            </p>
            <Link href={ROUTES.SEARCH}>
              <Button className="mt-6">Explore Companions</Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {/* Booking items would go here */}
          </div>
        )}
      </div>
    </div>
  );
}
