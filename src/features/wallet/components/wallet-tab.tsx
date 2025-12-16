'use client';

import { useState } from 'react';
import { useWalletData } from '@/features/wallet';
import { Button } from '@/shared/components/ui/button';
import { DepositModal } from './deposit-modal';
import { Wallet, Plus } from 'lucide-react';

export function WalletTab() {
  const { wallet, balance, isLoading, error, refetch } = useWalletData();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const handleDepositSuccess = () => {
    refetch();
    setIsDepositModalOpen(false);
  };

  const formatCurrency = (amount: number, currency: string = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? (error.message as string)
        : 'Failed to load wallet information';
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <p className="text-red-600">{errorMessage}</p>
          <Button onClick={() => refetch()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Ví của tôi</h2>

        {/* Balance Card */}
        <div className="mb-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/90">Số dư hiện tại</p>
              <p className="mt-2 text-3xl font-bold">
                {balance ? formatCurrency(balance.balance, balance.currency) : '0 ₫'}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Wallet Info */}
        {wallet && (
          <div className="mb-6 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Wallet ID</span>
              <span className="text-sm text-gray-900 font-mono">{wallet.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Currency</span>
              <span className="text-sm text-gray-900">{wallet.currency}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Ngày tạo</span>
              <span className="text-sm text-gray-900">
                {new Date(wallet.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => setIsDepositModalOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            Nạp tiền
          </Button>
        </div>
      </div>

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onSuccess={handleDepositSuccess}
      />
    </>
  );
}
