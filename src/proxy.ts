import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Route definitions for authentication proxy
 */
const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
];

const protectedRoutes = ['/dashboard', '/booking', '/account'];

const adminRoutes = ['/admin'];

/**
 * Check if pathname matches any of the given routes
 */
function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const isAuthenticated = !!accessToken;

  // Skip proxy for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && matchesRoute(pathname, authRoutes)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users to sign-in for protected routes
  if (!isAuthenticated && matchesRoute(pathname, protectedRoutes)) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Admin routes require authentication (role check happens in layout)
  if (!isAuthenticated && matchesRoute(pathname, adminRoutes)) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
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
