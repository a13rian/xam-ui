'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/stores';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import { ArrowLeft, Camera, Loader2 } from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  const getUserInitials = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase();
    }
    if (formData.firstName) {
      return formData.firstName[0].toUpperCase();
    }
    return 'U';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Call API to update profile
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push(ROUTES.DASHBOARD.PROFILE);
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href={ROUTES.DASHBOARD.PROFILE}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
          <div className="mt-4 flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-900 flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
                {user?.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.firstName || 'User avatar'}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  getUserInitials()
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 rounded-full bg-orange-600 p-2 text-white shadow-md hover:bg-orange-700"
                aria-label="Change avatar"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Change your photo
              </p>
              <p className="text-sm text-gray-500">
                JPG, PNG or GIF. Max size 2MB.
              </p>
              <div className="mt-2 flex gap-2">
                <Button type="button" variant="outline" size="sm">
                  Upload
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email || ''}
                disabled
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 shadow-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed.
              </p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Form actions */}
        <div className="flex justify-end gap-3">
          <Link href={ROUTES.DASHBOARD.PROFILE}>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
