'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/shared/lib/query';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './user.api';
import type {
  ListUsersParams,
  ListUsersResponse,
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../types';

export function useUsers(params: ListUsersParams = {}) {
  return useQuery<ListUsersResponse>({
    queryKey: queryKeys.users.list(params),
    queryFn: () => listUsers(params),
    staleTime: 30 * 1000,
  });
}

export function useUser(id: string) {
  return useQuery<User>({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id && id !== 'new',
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess: () => {
      toast.success('User created successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || 'Failed to create user');
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      updateUser(id, data),
    onSuccess: (_, variables) => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      });
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || 'Failed to update user');
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || 'Failed to delete user');
    },
  });
}
