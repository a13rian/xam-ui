'use client';

import { use } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { id } = use(params);

  // TODO: Fetch booking details using useBooking(id) hook

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href={ROUTES.DASHBOARD.BOOKINGS}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to bookings
      </Link>

      {/* Booking header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Booking #{id}
              </h1>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Confirmed
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Booked on December 15, 2024
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Contact Companion</Button>
            <Button variant="outline" className="text-red-600 hover:bg-red-50">
              Cancel Booking
            </Button>
          </div>
        </div>
      </div>

      {/* Booking details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Companion info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Companion Details
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium text-gray-900">Companion Name</p>
                <p className="text-sm text-gray-500">Professional Companion</p>
              </div>
            </div>
          </div>

          {/* Booking info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Booking Information
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Date</p>
                  <p className="text-sm text-gray-500">December 20, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Time</p>
                  <p className="text-sm text-gray-500">2:00 PM - 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-500">
                    123 Main Street, City, Country
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Payment Summary
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service fee</span>
                <span className="text-gray-900">$100.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform fee</span>
                <span className="text-gray-900">$10.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">$110.00</span>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-green-50 p-3">
              <p className="text-sm font-medium text-green-800">
                Payment Completed
              </p>
              <p className="mt-0.5 text-xs text-green-600">
                Paid on December 15, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
