'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { AccountListing } from '@/features/account-management/components/account-listing';

export default function AdminAccountsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage partner and business accounts.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <AccountListing />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <AccountListing status="pending" />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <AccountListing status="active" />
        </TabsContent>

        <TabsContent value="suspended" className="space-y-4">
          <AccountListing status="suspended" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
