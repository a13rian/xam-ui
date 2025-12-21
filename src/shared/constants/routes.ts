/**
 * Application route constants
 * Use these instead of hardcoding paths throughout the app
 */
export const ROUTES = {
  // Public marketing pages
  HOME: '/',
  ABOUT: '/about',
  PRICING: '/pricing',
  FEATURES: '/features',
  CONTACT: '/contact',
  HOW_IT_WORKS: '/how-it-works',
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  PRIVACY: '/privacy',
  TERMS: '/terms',

  // Auth pages
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // App pages (public browsing)
  SEARCH: '/search',
  COMPANION: (id: string) => `/companions/${id}`,
  BOOKING: (companionId: string) => `/booking/${companionId}`,

  // Profile/Account (protected)
  PROFILE: {
    HOME: '/profile',
    SECURITY: '/profile/security',
    NOTIFICATIONS: '/profile/notifications',
    VERIFICATION: '/profile/verification',
  },

  // Dashboard (protected)
  DASHBOARD: {
    HOME: '/dashboard',
    BOOKINGS: '/dashboard/bookings',
    BOOKING: (id: string) => `/dashboard/bookings/${id}`,
    WALLET: '/dashboard/wallet',
    PROFILE: '/dashboard/profile',
    PROFILE_EDIT: '/dashboard/profile/edit',
    SETTINGS: '/dashboard/settings',
    FAVORITES: '/dashboard/favorites',
  },

  // Admin (protected + role)
  ADMIN: {
    HOME: '/admin',
    USERS: '/admin/users',
    USER: (id: string) => `/admin/users/${id}`,
    USER_NEW: '/admin/users/new',
    ACCOUNTS: '/admin/accounts',
    ACCOUNT: (id: string) => `/admin/accounts/${id}`,
    COMPANIONS: '/admin/companions',
    COMPANION: (id: string) => `/admin/companions/${id}`,
    PARTNERS: '/admin/partners',
    BOOKINGS: '/admin/bookings',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },
} as const;

/**
 * Routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.PRICING,
  ROUTES.FEATURES,
  ROUTES.CONTACT,
  ROUTES.HOW_IT_WORKS,
  ROUTES.BLOG,
  ROUTES.PRIVACY,
  ROUTES.TERMS,
  ROUTES.SEARCH,
];

/**
 * Auth-related routes (redirect if already authenticated)
 */
export const AUTH_ROUTES = [
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
];

/**
 * Routes that require authentication
 */
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD.HOME,
  '/booking', // booking flow requires auth
];

/**
 * Routes that require admin role
 */
export const ADMIN_ROUTES = [ROUTES.ADMIN.HOME];
