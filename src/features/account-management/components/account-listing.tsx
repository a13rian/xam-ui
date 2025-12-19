'use client';

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

import { DataTableSkeleton } from '@/shared/components/ui/table/data-table-skeleton';
import { useAccounts } from '../api/account.queries';
import { AccountTable } from './account-table';
import type { AccountStatus } from '../types';

export function AccountListing() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [status] = useQueryState('status', parseAsString);

  const { data, isLoading, isError, error } = useAccounts({
    page: page ?? 1,
    limit: perPage ?? 10,
    status: status as AccountStatus | undefined,
  });

  if (isLoading) {
    return <DataTableSkeleton columnCount={7} rowCount={10} filterCount={3} />;
  }

  if (isError) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="font-medium">Error loading accounts</p>
        <p className="text-sm">
          {(error as { message?: string })?.message || 'Unknown error'}
        </p>
      </div>
    );
  }

  const accounts = data?.items || [];
  const totalItems = data?.total || 0;

  return <AccountTable data={accounts} totalItems={totalItems} />;
}
