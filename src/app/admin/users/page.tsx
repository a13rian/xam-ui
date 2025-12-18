'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { ROUTES } from '@/shared/constants/routes';
import { UserListing } from '@/features/user-management';

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all users on the platform.
          </p>
        </div>
        <Link href={ROUTES.ADMIN.USER_NEW}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <UserListing />
    </div>
  );
}
