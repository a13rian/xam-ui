import { get, post, patch, del } from '@/shared/lib/api';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ListUsersParams,
  ListUsersResponse,
} from '../types';

export async function listUsers(
  params: ListUsersParams = {}
): Promise<ListUsersResponse> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.set('page', String(params.page));
  if (params.limit) queryParams.set('limit', String(params.limit));
  if (params.search) queryParams.set('search', params.search);
  if (params.isActive !== undefined)
    queryParams.set('isActive', String(params.isActive));
  if (params.roleId) queryParams.set('roleId', params.roleId);

  const query = queryParams.toString();
  return get<ListUsersResponse>(`/users${query ? `?${query}` : ''}`);
}

export async function getUser(id: string): Promise<User> {
  return get<User>(`/users/${id}`);
}

export async function createUser(data: CreateUserRequest): Promise<User> {
  return post<User>('/users', data);
}

export async function updateUser(
  id: string,
  data: UpdateUserRequest
): Promise<User> {
  return patch<User>(`/users/${id}`, data);
}

export async function deleteUser(id: string): Promise<void> {
  return del(`/users/${id}`);
}
