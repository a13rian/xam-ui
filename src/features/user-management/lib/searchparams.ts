import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

export const userSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  search: parseAsString,
  isActive: parseAsString, // 'true' | 'false' as string for URL
};

export const userSearchParamsCache = createSearchParamsCache(userSearchParams);
export const userSerialize = createSerializer(userSearchParams);
