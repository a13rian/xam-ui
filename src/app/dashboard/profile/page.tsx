'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/stores';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
} from 'lucide-react';

export default function ProfilePage() {
  const user = useUser();

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your profile information.
          </p>
        </div>
        <Link href={ROUTES.DASHBOARD.PROFILE_EDIT}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* Profile card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Cover */}
        <div className="h-32 rounded-t-xl bg-gradient-to-r from-orange-400 to-orange-600" />

        {/* Avatar and basic info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
            {/* Avatar */}
            <div className="relative -mt-16 sm:-mt-12">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-900 flex items-center justify-center text-3xl font-bold text-white overflow-hidden shadow-lg">
                {user?.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.firstName || 'User avatar'}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  getUserInitials()
                )}
              </div>
              <button
                className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
                aria-label="Change avatar"
              >
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Name and role */}
            <div className="mt-4 text-center sm:mt-0 sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.firstName || 'User'}
              </h2>
              <p className="text-gray-500">Member</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <Mail className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  {user?.email || 'Not provided'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <Phone className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {user?.phone || 'Not provided'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <MapPin className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">Not provided</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            Account Information
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Member since</p>
                <p className="font-medium text-gray-900">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Unknown'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email verification</p>
                <p className="font-medium text-green-600">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
