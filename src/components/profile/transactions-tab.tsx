'use client';

import { useState, useEffect } from 'react';
import { getTransactions } from '@/lib/api/wallet';
import type { TransactionResponse, TransactionType } from '@/lib/api/types';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowRightLeft } from 'lucide-react';

export function TransactionsTab() {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdrawal'>('all');

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTransactions(page, 20);
      setTransactions(response.transactions);
      setTotalPages(response.totalPages);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err.message as string)
          : 'Failed to load transactions';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const formatCurrency = (amount: number, currency: string = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="h-5 w-5 text-green-600" />;
      case 'withdrawal':
        return <ArrowUp className="h-5 w-5 text-red-600" />;
      default:
        return <ArrowRightLeft className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTransactionLabel = (type: TransactionType) => {
    switch (type) {
      case 'deposit':
        return 'Nạp tiền';
      case 'withdrawal':
        return 'Rút tiền';
      case 'payment':
        return 'Thanh toán';
      case 'refund':
        return 'Hoàn tiền';
      case 'adjustment':
        return 'Điều chỉnh';
      default:
        return type;
    }
  };

  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filter);

  if (isLoading && transactions.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Lịch sử giao dịch</h2>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            Tất cả
          </Button>
          <Button
            variant={filter === 'deposit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('deposit')}
            className={filter === 'deposit' ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            Nạp tiền
          </Button>
          <Button
            variant={filter === 'withdrawal' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('withdrawal')}
            className={filter === 'withdrawal' ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            Rút tiền
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {filteredTransactions.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">Không có giao dịch nào</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {getTransactionLabel(transaction.type)}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                    <p className="text-xs text-gray-400">{formatDate(transaction.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === 'deposit' || transaction.type === 'refund'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'deposit' || transaction.type === 'refund' ? '+' : '-'}
                    {formatCurrency(Math.abs(transaction.amount), transaction.currency)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Số dư: {formatCurrency(transaction.balanceAfter, transaction.currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Trước
              </Button>
              <span className="text-sm text-gray-600">
                Trang {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Sau
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

