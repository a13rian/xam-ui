import Cookies from 'js-cookie';

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
  });

  // Store refresh token (30 days expiry)
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    expires: 30,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  // Store expiry timestamp
  Cookies.set(TOKEN_EXPIRY_KEY, expires.getTime().toString(), {
    expires: expires,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

/**
 * Get access token
 */
export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

/**
 * Get refresh token
 */
export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
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
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  Cookies.remove(TOKEN_EXPIRY_KEY);
}

/**
 * Check if authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAccessToken();
  return !!token && !isTokenExpired();
}

