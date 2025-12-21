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
    <div className="rounded-2xl border border-border/50 bg-background p-6 sm:p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage/20">
          <Mail className="h-6 w-6 text-sage" />
        </div>
        <div>
          <h2 className="font-display text-2xl text-foreground">
            Xác thực email
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Xác thực email để bảo vệ tài khoản của bạn
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {(error as { message?: string })?.message ||
            'Gửi email xác thực thất bại. Vui lòng thử lại.'}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl bg-sage/10 p-4 text-sm text-sage">
          Email xác thực đã được gửi! Vui lòng kiểm tra hộp thư của bạn.
        </div>
      )}

      <div className="space-y-6">
        {/* Email display */}
        <div className="flex items-center justify-between rounded-xl border border-border/50 p-5">
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{user?.email}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Email đăng ký
              </p>
            </div>
          </div>
          {isVerified ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-4 py-1.5 text-sm font-medium text-sage">
              <CheckCircle className="h-4 w-4" />
              Đã xác thực
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-light px-4 py-1.5 text-sm font-medium text-terracotta">
              <XCircle className="h-4 w-4" />
              Chưa xác thực
            </span>
          )}
        </div>

        {/* Verification actions */}
        {!isVerified && (
          <div className="rounded-xl bg-muted/50 p-5">
            <h3 className="font-medium text-foreground">
              Xác thực email của bạn
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Chúng tôi sẽ gửi một email chứa liên kết xác thực đến địa chỉ
              email của bạn. Nhấp vào liên kết để hoàn tất quá trình xác thực.
            </p>
            <div className="mt-5">
              <Button
                onClick={handleRequestVerification}
                disabled={isPending || cooldown > 0}
                className="h-12 rounded-xl bg-terracotta px-8 text-sm font-medium hover:bg-terracotta-dark"
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
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">
            Lợi ích của việc xác thực email
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage" />
              <span>Bảo vệ tài khoản của bạn tốt hơn</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage" />
              <span>Nhận thông báo quan trọng về đặt chỗ</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage" />
              <span>Khôi phục mật khẩu dễ dàng khi cần</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage" />
              <span>Tăng độ tin cậy cho hồ sơ của bạn</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
