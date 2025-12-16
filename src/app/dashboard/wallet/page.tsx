'use client';

import { useState } from 'react';
import {
  Wallet,
  Plus,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type TransactionType = 'all' | 'deposits' | 'payments';

const transactionTabs: { value: TransactionType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'deposits', label: 'Deposits' },
  { value: 'payments', label: 'Payments' },
];

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<TransactionType>('all');

  // TODO: Replace with actual data from useWallet hook
  const balance = 250.0;
  const transactions: unknown[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your balance and view transaction history.
        </p>
      </div>

      {/* Balance card */}
      <div className="rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-orange-100">
              Available Balance
            </p>
            <p className="mt-2 text-4xl font-bold">${balance.toFixed(2)}</p>
          </div>
          <div className="rounded-full bg-white/20 p-3">
            <Wallet className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Button
            variant="secondary"
            className="bg-white text-orange-600 hover:bg-orange-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Funds
          </Button>
          <Button
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Methods
          </Button>
        </div>
      </div>

      {/* Transaction history */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Transaction History
            </h2>
            {/* Transaction type tabs */}
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
              {transactionTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === tab.value
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-4">
                <Wallet className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No transactions yet
              </h3>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Add funds to your wallet to start making bookings.
              </p>
              <Button className="mt-6">
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Transaction items would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
