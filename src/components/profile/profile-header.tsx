'use client';

import Image from 'next/image';
import type { AuthUser } from '@/lib/api/types';

interface ProfileHeaderProps {
  user: AuthUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const getUserInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const fullName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || 'User';

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
        {user.avatarUrl ? (
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-orange-500 sm:h-24 sm:w-24">
            <Image
              src={user.avatarUrl}
              alt={fullName}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-2xl font-semibold text-white sm:h-24 sm:w-24 sm:text-3xl">
            {getUserInitials()}
          </div>
        )}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{fullName}</h1>
          <p className="mt-1 text-sm text-gray-600">{user.email}</p>
          {user.roleIds && user.roleIds.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              {user.roleIds.map((roleId) => (
                <span
                  key={roleId}
                  className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
                >
                  {roleId}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

