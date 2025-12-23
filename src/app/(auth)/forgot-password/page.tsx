'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { motion } from 'motion/react';
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
import { premiumEase, staggerContainer, fadeInUp } from '@/features/landing';

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
      <motion.div
        className="absolute right-6 top-6 lg:hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: premiumEase }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender">
            <svg
              className="h-4 w-4 text-charcoal"
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
          <span className="font-display text-lg tracking-tight text-charcoal">Cogie</span>
        </Link>
      </motion.div>

      {/* Form Container */}
      <motion.div
        className="w-full max-w-md"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Back Link */}
        <motion.div variants={fadeInUp}>
          <Link
            href="/sign-in"
            className="mb-8 inline-flex items-center gap-2 text-sm text-charcoal-light transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại đăng nhập
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-10">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender/20">
            <Mail className="h-7 w-7 text-lavender-dark" />
          </div>
          <h1 className="font-display text-4xl tracking-tight text-charcoal">
            Quên Mật Khẩu?
          </h1>
          <p className="mt-3 leading-relaxed text-charcoal-light">
            Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu.
          </p>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-start gap-3 rounded-[16px] border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Đã gửi link đặt lại mật khẩu!</p>
              <p className="mt-1 text-green-600">
                Vui lòng kiểm tra hộp thư email của bạn.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-[16px] border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <motion.div variants={fadeInUp}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-charcoal">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="h-12 rounded-[16px] border-charcoal/10 bg-white focus:border-lavender focus:ring-lavender"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Send Reset Link Button */}
            <motion.div variants={fadeInUp}>
              <Button
                type="submit"
                className="h-12 w-full rounded-[16px] bg-charcoal font-medium text-white transition-all hover:bg-charcoal/90 hover:scale-[0.98] active:scale-[0.96]"
                disabled={isLoading || success}
              >
                {isLoading
                  ? 'Đang gửi...'
                  : success
                    ? 'Đã gửi thành công!'
                    : 'Gửi link đặt lại mật khẩu'}
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Additional Help */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 rounded-[16px] border border-charcoal/10 bg-white p-5"
        >
          <p className="text-sm leading-relaxed text-charcoal-light">
            <span className="font-medium text-charcoal">Không nhận được email?</span>{' '}
            Kiểm tra thư mục spam hoặc{' '}
            <button
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              className="font-medium text-lavender-dark hover:text-charcoal"
              disabled={isLoading}
            >
              gửi lại
            </button>
            .
          </p>
        </motion.div>

        {/* Sign Up Link */}
        <motion.p
          variants={fadeInUp}
          className="mt-10 text-center text-sm text-charcoal-light"
        >
          Chưa có tài khoản?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-lavender-dark transition-colors hover:text-charcoal"
          >
            Đăng ký ngay
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
