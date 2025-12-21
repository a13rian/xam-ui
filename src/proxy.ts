import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Cookie keys - must match token-storage.ts
 */
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';

/**
 * Refresh token 60 seconds before expiry
 */
const REFRESH_BUFFER_MS = 60 * 1000;

/**
 * Token response from refresh endpoint
 */
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Route definitions for authentication proxy
 */
const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
];

const protectedRoutes = ['/dashboard', '/booking', '/profile', '/become-partner'];

const adminRoutes = ['/admin'];

/**
 * Check if pathname matches any of the given routes
 */
function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Check if access token should be refreshed
 * Returns true if token is expired or about to expire
 */
function shouldRefreshToken(request: NextRequest): boolean {
  const tokenExpiry = request.cookies.get(TOKEN_EXPIRY_KEY)?.value;

  if (!tokenExpiry) {
    return true;
  }

  const expiryTime = parseInt(tokenExpiry, 10);
  if (isNaN(expiryTime)) {
    return true;
  }

  return Date.now() >= expiryTime - REFRESH_BUFFER_MS;
}

/**
 * Attempt to refresh the access token using the refresh token
 * Returns new tokens if successful, null if failed
 */
async function refreshAccessToken(
  refreshToken: string
): Promise<TokenResponse | null> {
  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Set authentication cookies on the response
 * Matches configuration from token-storage.ts
 */
function setAuthCookies(response: NextResponse, tokens: TokenResponse): void {
  const expiryDate = new Date(Date.now() + tokens.expiresIn * 1000);
  const isProduction = process.env.NODE_ENV === 'production';

  response.cookies.set(ACCESS_TOKEN_KEY, tokens.accessToken, {
    expires: expiryDate,
    sameSite: 'strict',
    secure: isProduction,
    path: '/',
  });

  response.cookies.set(REFRESH_TOKEN_KEY, tokens.refreshToken, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    sameSite: 'strict',
    secure: isProduction,
    path: '/',
  });

  response.cookies.set(TOKEN_EXPIRY_KEY, expiryDate.getTime().toString(), {
    expires: expiryDate,
    sameSite: 'strict',
    secure: isProduction,
    path: '/',
  });
}

/**
 * Clear all authentication cookies
 */
function clearAuthCookies(response: NextResponse): void {
  response.cookies.delete(ACCESS_TOKEN_KEY);
  response.cookies.delete(REFRESH_TOKEN_KEY);
  response.cookies.delete(TOKEN_EXPIRY_KEY);
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get auth tokens from cookies
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

  // Determine authentication state and handle token refresh
  let isAuthenticated = !!accessToken;
  const response = NextResponse.next();

  // Check if we need to refresh the token
  const needsRefresh =
    (accessToken && shouldRefreshToken(request)) ||
    (!accessToken && refreshToken);

  if (needsRefresh && refreshToken) {
    const newTokens = await refreshAccessToken(refreshToken);

    if (newTokens) {
      // Refresh successful - set new cookies and mark as authenticated
      setAuthCookies(response, newTokens);
      isAuthenticated = true;
    } else {
      // Refresh failed - clear cookies and mark as unauthenticated
      clearAuthCookies(response);
      isAuthenticated = false;
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && matchesRoute(pathname, authRoutes)) {
    const redirectResponse = NextResponse.redirect(new URL('/', request.url));
    // Preserve new cookies if we just refreshed
    if (needsRefresh) {
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value);
      });
    }
    return redirectResponse;
  }

  // Redirect unauthenticated users to sign-in for protected routes
  if (!isAuthenticated && matchesRoute(pathname, protectedRoutes)) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    const redirectResponse = NextResponse.redirect(signInUrl);
    // Preserve cleared cookies if refresh failed
    if (needsRefresh) {
      clearAuthCookies(redirectResponse);
    }
    return redirectResponse;
  }

  // Admin routes require authentication (role check happens in layout)
  if (!isAuthenticated && matchesRoute(pathname, adminRoutes)) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    const redirectResponse = NextResponse.redirect(signInUrl);
    if (needsRefresh) {
      clearAuthCookies(redirectResponse);
    }
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
