'use client';

import { useState } from 'react';

import { DataTableSkeleton } from '@/shared/components/ui/data-table-skeleton';
import { useAccounts } from '../api/account.queries';
import { AccountTable } from './account-table';

interface AccountListingProps {
  status?: string;
}

export function AccountListing({ status }: AccountListingProps) {
  const [page] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, isError, error } = useAccounts({
    page,
    limit,
    status: status as 'pending' | 'active' | 'rejected' | 'suspended' | undefined,
  });

  if (isLoading) {
    return <DataTableSkeleton columnCount={7} rowCount={10} />;
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
  const pageCount = data ? Math.ceil(data.total / data.limit) : 0;

  return <AccountTable data={accounts} pageCount={pageCount} />;
}
