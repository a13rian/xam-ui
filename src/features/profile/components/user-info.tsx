'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { toast } from 'sonner';
import type { AuthUser } from '@/features/auth';
import { updateUser, uploadAvatar, useAuth } from '@/features/auth';
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
import { Save, Camera } from 'lucide-react';

const userInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Họ là bắt buộc')
    .max(100, 'Họ không được vượt quá 100 ký tự'),
  lastName: z
    .string()
    .min(1, 'Tên là bắt buộc')
    .max(100, 'Tên không được vượt quá 100 ký tự'),
  phone: z
    .string()
    .max(20, 'Số điện thoại không được vượt quá 20 ký tự')
    .regex(/^[0-9+\-\s()]*$/, 'Số điện thoại không hợp lệ')
    .optional()
    .nullable(),
  dateOfBirth: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        const dayDiff = today.getDate() - date.getDate();
        const actualAge =
          monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)
            ? age - 1
            : age;
        return actualAge >= 13 && actualAge <= 120;
      },
      { message: 'Ngày sinh không hợp lệ (phải từ 13-120 tuổi)' }
    ),
  gender: z
    .enum(['male', 'female', 'other', 'prefer_not_to_say'], {
      errorMap: () => ({ message: 'Vui lòng chọn giới tính' }),
    })
    .optional()
    .nullable(),
});

type UserInfoFormValues = z.infer<typeof userInfoSchema>;

interface UserInfoTabProps {
  user: AuthUser;
}

export function UserInfo({ user }: UserInfoTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(
    user.avatarUrl
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refreshAuth } = useAuth();

  const form = useForm<UserInfoFormValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || null,
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split('T')[0]
        : null,
      gender: user.gender || null,
    },
  });

  // Sync avatarUrl with user when user changes
  useEffect(() => {
    setAvatarUrl(user.avatarUrl);
  }, [user.avatarUrl]);

  // Sync form values with user when user changes
  useEffect(() => {
    form.reset({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || null,
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split('T')[0]
        : null,
      gender: user.gender || null,
    });
  }, [user, form]);

  const onSubmit = async (data: UserInfoFormValues) => {
    setIsLoading(true);

    try {
      await updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || null,
        dateOfBirth: data.dateOfBirth || null,
        gender: data.gender || null,
      });
      await refreshAuth();
      toast.success('Cập nhật thông tin thành công');
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err.message as string)
          : 'Cập nhật thông tin thất bại. Vui lòng thử lại.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước file không được vượt quá 5MB');
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const response = await uploadAvatar(file);
      setAvatarUrl(response.avatarUrl);
      await refreshAuth();
      toast.success('Cập nhật ảnh đại diện thành công');
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err.message as string)
          : 'Upload avatar thất bại. Vui lòng thử lại.';
      toast.error(errorMessage);
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getUserInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const fullName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || 'N/A';

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Thông tin cá nhân
        </h2>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Avatar Section - Left Side */}
        <div className="shrink-0">
          <label className="mb-4 block text-sm font-medium text-gray-700">
            Ảnh đại diện
          </label>
          <div className="flex flex-col items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isUploadingAvatar}
              className="group relative size-28 cursor-pointer rounded-full border border-dashed border-gray-300 p-1.5 text-xs sm:size-32"
              aria-label={avatarUrl ? 'Cập nhật ảnh' : 'Tải ảnh'}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={fullName}
                    fill
                    className="object-cover"
                    sizes="160px"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-orange-500 text-3xl font-semibold text-white sm:text-4xl">
                    {getUserInitials()}
                  </div>
                )}

                {/* Hover overlay: update photo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera className="h-5 w-5" />
                  <span className="mt-1 text-xs font-medium">
                    {avatarUrl ? 'Cập nhật ảnh' : 'Tải ảnh'}
                  </span>
                </div>

                {isUploadingAvatar && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Form Section - Right Side */}
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nhập họ"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nhập tên"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Nhập số điện thoại"
                          className="h-11"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày sinh</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-11"
                          {...field}
                          value={field.value || ''}
                          max={new Date(
                            new Date().setFullYear(new Date().getFullYear() - 13)
                          )
                            .toISOString()
                            .split('T')[0]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={field.value || ''}
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                        <option value="prefer_not_to_say">
                          Không muốn tiết lộ
                        </option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={user.email}
                  readOnly
                  className="h-11 bg-gray-50 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Email không thể thay đổi
                </p>
              </div>

              {user.roleIds && user.roleIds.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vai trò
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.roleIds.map((roleId) => (
                      <span
                        key={roleId}
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800"
                      >
                        {roleId}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
