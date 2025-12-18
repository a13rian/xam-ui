'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ROUTES } from '@/shared/constants/routes';
import { UserForm, useUser } from '@/features/user-management';
import { UserDetailView } from './user-detail-view';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const isNew = id === 'new';

  const { data: user, isLoading, isError, error } = useUser(id);

  if (isNew) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href={ROUTES.ADMIN.USERS}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create New User</h1>
        </div>
        <UserForm initialData={null} pageTitle="Create New User" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href={ROUTES.ADMIN.USERS}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">User Not Found</h1>
        </div>
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error loading user</p>
          <p className="text-sm">
            {(error as { message?: string })?.message || 'User not found'}
          </p>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href={ROUTES.ADMIN.USER(id)}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit User</h1>
        </div>
        <UserForm initialData={user} pageTitle="Edit User" />
      </div>
    );
  }

  return <UserDetailView user={user} />;
}
