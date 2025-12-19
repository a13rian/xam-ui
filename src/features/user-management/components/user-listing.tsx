'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { DataTableSkeleton } from '@/shared/components/ui/table/data-table-skeleton';
import { useUsers } from '../api/user.queries';
import { UserTable } from './user-table';

export function UserListing() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const { data, isLoading, isError, error } = useUsers({
    page: page ?? 1,
    limit: perPage ?? 10
  });

  if (isLoading) {
    return <DataTableSkeleton columnCount={6} rowCount={10} filterCount={2} />;
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
  const totalItems = data?.total || 0;

  return <UserTable data={users} totalItems={totalItems} />;
}
