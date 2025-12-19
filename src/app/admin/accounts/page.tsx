import { AccountListing } from '@/features/account-management/components/account-listing';

export const metadata = {
  title: 'Accounts | Admin',
};

export default function AdminAccountsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage partner and business accounts.
        </p>
      </div>

      <AccountListing />
    </div>
  );
}
