import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

export const accountSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  search: parseAsString,
  type: parseAsString, // 'individual' | 'business'
  status: parseAsString, // 'pending' | 'active' | 'rejected' | 'suspended'
};

export const accountSearchParamsCache = createSearchParamsCache(accountSearchParams);
export const accountSerialize = createSerializer(accountSearchParams);
