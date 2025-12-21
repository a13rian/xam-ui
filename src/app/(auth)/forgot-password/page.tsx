'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { forgotPassword as forgotPasswordApi } from '@/features/auth';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await forgotPasswordApi({ email: data.email });
      setSuccess(true);
      form.reset();
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err.message as string)
          : 'Failed to send reset link. Please try again later';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      {/* Mobile Logo */}
      <div className="absolute right-6 top-6 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta">
            <svg
              className="h-4 w-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="font-display text-lg tracking-tight text-foreground">Cogie</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/sign-in"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại đăng nhập
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta-light">
            <Mail className="h-7 w-7 text-terracotta" />
          </div>
          <h1 className="font-display text-4xl tracking-tight text-foreground">
            Quên Mật Khẩu?
          </h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-sage/30 bg-sage/10 p-4 text-sm text-sage">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Đã gửi link đặt lại mật khẩu!</p>
              <p className="mt-1 text-sage/80">
                Vui lòng kiểm tra hộp thư email của bạn.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Nhập email của bạn"
                      className="h-12 rounded-xl border-border/50 bg-background focus:border-terracotta focus:ring-terracotta"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Send Reset Link Button */}
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-terracotta font-medium text-white transition-colors hover:bg-terracotta-dark"
              disabled={isLoading || success}
            >
              {isLoading
                ? 'Đang gửi...'
                : success
                  ? 'Đã gửi thành công!'
                  : 'Gửi link đặt lại mật khẩu'}
            </Button>
          </form>
        </Form>

        {/* Additional Help */}
        <div className="mt-10 rounded-xl border border-border/50 bg-background p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Không nhận được email?</span>{' '}
            Kiểm tra thư mục spam hoặc{' '}
            <button
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              className="font-medium text-terracotta hover:text-terracotta-dark"
              disabled={isLoading}
            >
              gửi lại
            </button>
            .
          </p>
        </div>

        {/* Sign Up Link */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-terracotta transition-colors hover:text-terracotta-dark"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
