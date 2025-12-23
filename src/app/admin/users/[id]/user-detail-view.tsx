'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Shield,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Separator } from '@/shared/components/ui/separator';
import { ROUTES } from '@/shared/constants/routes';
import type { User } from '@/features/admin/user';
import {
  useDeleteUser,
  useUpdateUser,
  DeleteConfirmDialog,
} from '@/features/admin/user';

interface UserDetailViewProps {
  user: User;
}

export function UserDetailView({ user }: UserDetailViewProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  const initials = `${user.firstName?.[0] || ''}${
    user.lastName?.[0] || ''
  }`.toUpperCase();

  const handleToggleStatus = () => {
    updateMutation.mutate({
      id: user.id,
      data: { isActive: !user.isActive },
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
        router.push(ROUTES.ADMIN.USERS);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={ROUTES.ADMIN.USERS}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleToggleStatus}
            disabled={updateMutation.isPending}
          >
            {user.isActive ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </Button>
          <Link href={`${ROUTES.ADMIN.USER(user.id)}?edit=true`}>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* User Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatarUrl || undefined} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex gap-2">
                <Badge variant={user.isActive ? 'default' : 'secondary'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <Badge variant={user.emailVerifiedAt ? 'default' : 'outline'}>
                  {user.emailVerifiedAt ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">
                    {user.dateOfBirth
                      ? format(new Date(user.dateOfBirth), 'PPP')
                      : 'Not provided'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium capitalize">
                    {user.gender || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="mb-2 text-sm text-muted-foreground">Roles</p>
              <div className="flex flex-wrap gap-2">
                {user.roleNames?.length > 0 ? (
                  user.roleNames.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">
                    No roles assigned
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium">
                  {format(new Date(user.createdAt), 'PPP')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {format(new Date(user.updatedAt), 'PPP')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        title="Delete User"
        description={`Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`}
      />
    </div>
  );
}
