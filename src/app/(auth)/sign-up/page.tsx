'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { register as registerApi } from '@/features/auth';
import { premiumEase, staggerContainer, fadeInUp } from '@/features/landing';

const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const nameParts = data.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await registerApi({
        email: data.email,
        password: data.password,
        firstName,
        lastName,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err.message as string)
          : 'Registration failed. Please try again later';
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
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <h1 className="font-display text-4xl tracking-tight text-charcoal">
            Tạo Tài Khoản
          </h1>
          <p className="mt-3 text-charcoal-light">
            Bắt đầu hành trình kết nối của bạn
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
              <p className="font-medium">Đăng ký thành công!</p>
              <p className="mt-1 text-green-600">
                Vui lòng kiểm tra email để xác thực tài khoản. Đang chuyển hướng...
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
            {/* Full Name Field */}
            <motion.div variants={fadeInUp}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-charcoal">Họ và tên</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nhập họ và tên"
                        className="h-12 rounded-[16px] border-charcoal/10 bg-white focus:border-lavender focus:ring-lavender"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

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

            {/* Password Field */}
            <motion.div variants={fadeInUp}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-charcoal">Mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Tối thiểu 8 ký tự"
                          className="h-12 rounded-[16px] border-charcoal/10 bg-white pr-12 focus:border-lavender focus:ring-lavender"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 rounded-xl text-charcoal-light hover:text-charcoal"
                          data-testid="toggle-password"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={fadeInUp}>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-charcoal">Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Nhập lại mật khẩu"
                          className="h-12 rounded-[16px] border-charcoal/10 bg-white pr-12 focus:border-lavender focus:ring-lavender"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 rounded-xl text-charcoal-light hover:text-charcoal"
                          data-testid="toggle-confirm-password"
                          aria-label={
                            showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Terms & Conditions */}
            <motion.div variants={fadeInUp}>
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 border-charcoal/20 data-[state=checked]:border-lavender data-[state=checked]:bg-lavender"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer text-sm font-normal leading-relaxed text-charcoal-light">
                        Tôi đồng ý với{' '}
                        <Link
                          href="/terms"
                          className="font-medium text-lavender-dark hover:text-charcoal"
                        >
                          Điều khoản dịch vụ
                        </Link>{' '}
                        và{' '}
                        <Link
                          href="/privacy"
                          className="font-medium text-lavender-dark hover:text-charcoal"
                        >
                          Chính sách bảo mật
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Sign Up Button */}
            <motion.div variants={fadeInUp}>
              <Button
                type="submit"
                className="h-12 w-full rounded-[16px] bg-charcoal font-medium text-white transition-all hover:bg-charcoal/90 hover:scale-[0.98] active:scale-[0.96]"
                disabled={isLoading || success}
              >
                {isLoading ? 'Đang tạo tài khoản...' : success ? 'Đã tạo thành công!' : 'Đăng ký'}
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeInUp} className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-charcoal/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-cream px-4 text-charcoal-light">Hoặc</span>
              </div>
            </motion.div>

            {/* Google Sign Up */}
            <motion.div variants={fadeInUp}>
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-[16px] border-charcoal/10 bg-white font-medium transition-all hover:border-lavender/50 hover:bg-lavender/10 hover:scale-[0.98] active:scale-[0.96]"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Đăng ký với Google
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Sign In Link */}
        <motion.p
          variants={fadeInUp}
          className="mt-10 text-center text-sm text-charcoal-light"
        >
          Đã có tài khoản?{' '}
          <Link
            href="/sign-in"
            className="font-medium text-lavender-dark transition-colors hover:text-charcoal"
          >
            Đăng nhập
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
