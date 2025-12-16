import Cookies from 'js-cookie';
import { setTokenStorage } from '@/shared/lib/api/client';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';

/**
 * Set tokens
 */
export function setTokens(
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
): void {
  // Calculate expiry time (seconds to milliseconds)
  const expires = new Date(Date.now() + expiresIn * 1000);

  // Store access token (7 days expiry, but actually controlled by expiresIn)
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    expires: expires,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  // Store refresh token (30 days expiry)
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    expires: 30,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  // Store expiry timestamp
  Cookies.set(TOKEN_EXPIRY_KEY, expires.getTime().toString(), {
    expires: expires,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

/**
 * Get access token
 */
export function getAccessToken(): string | null {
  return Cookies.get(ACCESS_TOKEN_KEY) || null;
}

/**
 * Get refresh token
 */
export function getRefreshToken(): string | null {
  return Cookies.get(REFRESH_TOKEN_KEY) || null;
}

/**
 * Check if token is expired
 */
export function isTokenExpired(): boolean {
  const expiry = Cookies.get(TOKEN_EXPIRY_KEY);
  if (!expiry) {
    return true;
  }

  const expiryTime = parseInt(expiry, 10);
  return Date.now() >= expiryTime;
}

/**
 * Remove all tokens
 */
export function removeTokens(): void {
  Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
  Cookies.remove(TOKEN_EXPIRY_KEY, { path: '/' });
}

/**
 * Check if authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAccessToken();
  return !!token && !isTokenExpired();
}

/**
 * Initialize token storage for API client
 * Call this on app initialization
 */
export function initializeTokenStorage(): void {
  setTokenStorage({
    getAccessToken,
    getRefreshToken,
    setTokens,
    removeTokens,
  });
}
