'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import type { AuthUser } from '@/lib/api/types';
import { updateUser, uploadAvatar, removeAvatar } from '@/lib/api/auth';
import { useAuth } from '@/hooks/use-auth';
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
import { Save, Trash2, Camera } from 'lucide-react';

const userInfoSchema = z.object({
  firstName: z.string().min(1, 'Họ là bắt buộc').max(100, 'Họ không được vượt quá 100 ký tự'),
  lastName: z.string().min(1, 'Tên là bắt buộc').max(100, 'Tên không được vượt quá 100 ký tự'),
});

type UserInfoFormValues = z.infer<typeof userInfoSchema>;

interface UserInfoTabProps {
  user: AuthUser;
}

export function UserInfoTab({ user }: UserInfoTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(user.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refreshAuth } = useAuth();

  const form = useForm<UserInfoFormValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
  });

  // Sync avatarUrl with user when user changes
  useEffect(() => {
    setAvatarUrl(user.avatarUrl);
  }, [user.avatarUrl]);

  const onSubmit = async (data: UserInfoFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
      });
      await refreshAuth();
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err.message as string)
          : 'Cập nhật thông tin thất bại. Vui lòng thử lại.';
      setError(errorMessage);
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
      setError('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước file không được vượt quá 5MB');
      return;
    }

    setIsUploadingAvatar(true);
    setError(null);

    try {
      const response = await uploadAvatar(file);
      setAvatarUrl(response.avatarUrl);
      await refreshAuth();
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err.message as string)
          : 'Upload avatar thất bại. Vui lòng thử lại.';
      setError(errorMessage);
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!avatarUrl) return;

    setIsUploadingAvatar(true);
    setError(null);

    try {
      await removeAvatar();
      setAvatarUrl(null);
      await refreshAuth();
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err.message as string)
          : 'Xóa avatar thất bại. Vui lòng thử lại.';
      setError(errorMessage);
    } finally {
      setIsUploadingAvatar(false);
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
        <h2 className="text-xl font-semibold text-gray-900">Thông tin cá nhân</h2>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Avatar Section - Left Side */}
        <div className="flex-shrink-0">
          <label className="block text-sm font-medium text-gray-700 mb-4">Ảnh đại diện</label>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {avatarUrl ? (
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200 sm:h-40 sm:w-40">
                  <Image
                    src={avatarUrl}
                    alt={fullName}
                    fill
                    className="object-cover"
                    sizes="160px"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-orange-500 text-3xl font-semibold text-white border-2 border-gray-200 sm:h-40 sm:w-40 sm:text-4xl">
                  {getUserInitials()}
                </div>
              )}
              {isUploadingAvatar && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAvatarClick}
                disabled={isUploadingAvatar}
                className="flex items-center justify-center gap-2 w-full"
              >
                <Camera className="h-4 w-4" />
                {avatarUrl ? 'Đổi ảnh' : 'Tải ảnh lên'}
              </Button>
              {avatarUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  disabled={isUploadingAvatar}
                  className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
                >
                  <Trash2 className="h-4 w-4" />
                  Xóa ảnh
                </Button>
              )}
            </div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              value={user.email}
              readOnly
              className="h-11 bg-gray-50 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">Email không thể thay đổi</p>
          </div>

          {user.roleIds && user.roleIds.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Vai trò</label>
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

