'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Mail, CheckCircle, XCircle, Send } from 'lucide-react';
import { useUser } from '@/stores';
import { useRequestEmailVerification } from '../api';

const COOLDOWN_SECONDS = 60;

export function EmailVerificationSection() {
  const user = useUser();
  const [cooldown, setCooldown] = useState(0);
  const [success, setSuccess] = useState(false);

  const {
    mutate: requestVerification,
    isPending,
    error,
  } = useRequestEmailVerification();

  // Handle cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleRequestVerification = useCallback(() => {
    setSuccess(false);
    requestVerification(undefined, {
      onSuccess: () => {
        setSuccess(true);
        setCooldown(COOLDOWN_SECONDS);
      },
    });
  }, [requestVerification]);

  // For demo purposes, we'll check if user has emailVerified property
  // In real implementation, this would come from the API
  const isVerified = false; // TODO: Get from user object when backend supports it

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-purple-100 p-2">
          <Mail className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Xác thực email
          </h2>
          <p className="text-sm text-gray-500">
            Xác thực email để bảo vệ tài khoản của bạn
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {(error as { message?: string })?.message ||
            'Gửi email xác thực thất bại. Vui lòng thử lại.'}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
          Email xác thực đã được gửi! Vui lòng kiểm tra hộp thư của bạn.
        </div>
      )}

      <div className="space-y-6">
        {/* Email display */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{user?.email}</p>
              <p className="text-sm text-gray-500">Email đăng ký</p>
            </div>
          </div>
          {isVerified ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              <CheckCircle className="h-4 w-4" />
              Đã xác thực
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
              <XCircle className="h-4 w-4" />
              Chưa xác thực
            </span>
          )}
        </div>

        {/* Verification actions */}
        {!isVerified && (
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="font-medium text-gray-900">
              Xác thực email của bạn
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Chúng tôi sẽ gửi một email chứa liên kết xác thực đến địa chỉ
              email của bạn. Nhấp vào liên kết để hoàn tất quá trình xác thực.
            </p>
            <div className="mt-4">
              <Button
                onClick={handleRequestVerification}
                disabled={isPending || cooldown > 0}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="mr-2 h-4 w-4" />
                {isPending
                  ? 'Đang gửi...'
                  : cooldown > 0
                    ? `Gửi lại sau ${cooldown}s`
                    : 'Gửi email xác thực'}
              </Button>
            </div>
          </div>
        )}

        {/* Benefits of verification */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">
            Lợi ích của việc xác thực email
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
              <span>Bảo vệ tài khoản của bạn tốt hơn</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
              <span>Nhận thông báo quan trọng về đặt chỗ</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
              <span>Khôi phục mật khẩu dễ dàng khi cần</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
              <span>Tăng độ tin cậy cho hồ sơ của bạn</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
