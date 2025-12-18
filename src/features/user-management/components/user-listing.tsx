'use client';

import { useState } from 'react';

import { DataTableSkeleton } from '@/shared/components/ui/data-table-skeleton';
import { useUsers } from '../api/user.queries';
import { UserTable } from './user-table';

export function UserListing() {
  const [page] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, isError, error } = useUsers({ page, limit });

  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} />;
  }

  if (isError) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="font-medium">Error loading users</p>
        <p className="text-sm">{(error as { message?: string })?.message || 'Unknown error'}</p>
      </div>
    );
  }

  const users = data?.items || [];
  const pageCount = data ? Math.ceil(data.total / data.limit) : 0;

  return <UserTable data={users} pageCount={pageCount} />;
}
