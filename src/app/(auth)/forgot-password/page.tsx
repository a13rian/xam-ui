'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { forgotPassword as forgotPasswordApi } from '@/lib/api/auth';

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
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-white">
      {/* Logo */}
      <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
        <Link href="/" className="flex items-center gap-2">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xl font-semibold">Cogie</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-gray-900">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
            Reset link has been sent to your email. Please check your inbox.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-11 rounded-full"
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
              className="w-full h-11 rounded-full"
              disabled={isLoading || success}
            >
              {isLoading
                ? 'Sending...'
                : success
                ? 'Reset Link Sent!'
                : 'Send Reset Link'}
            </Button>
          </form>
        </Form>

        {/* Back to Sign In Link */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link
            href="/sign-in"
            className="font-semibold text-foreground hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
