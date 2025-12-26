# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev              # Start dev server on port 8100
bun run build            # Build for production
bun run lint             # Run ESLint

# E2E Testing (requires backend on port 3100)
bun run test:e2e         # Run all Playwright E2E tests
bun run test:e2e:ui      # Run Playwright with UI
bun run test:e2e:headed  # Run tests in headed browser mode
bun run test:e2e:auth    # Run only auth tests
bun run test:e2e:partner # Run only partner tests
```

## Environment Variables

Create `.env.local` with:
```
SERVER_URL=http://localhost:3100   # Backend API server
```

The frontend proxies `/api/*` requests to `SERVER_URL` via Next.js rewrites in `next.config.ts`.

## Architecture

This is a Next.js 16 companion booking application using React 19, TypeScript, Tailwind CSS v4, and Zustand + TanStack Query for state management.

### Directory Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (auth)/       # Auth pages (sign-in, sign-up, forgot-password)
│   ├── (main)/       # Public marketing pages with marketing layout
│   ├── dashboard/    # Protected user dashboard
│   └── admin/        # Protected admin panel
├── features/         # Feature modules (auth, companions, search, bookings, wallet, profile, favorites, partner, admin)
├── layouts/          # Layout components (marketing, auth, dashboard, admin)
├── shared/           # Shared utilities, components, types, constants
├── stores/           # Global Zustand stores
├── providers/        # React context providers
└── proxy.ts          # Middleware for route protection and token refresh
```

### Feature Module Structure

Each feature in `src/features/` follows a consistent pattern:
- `api/` - API calls and TanStack Query hooks
- `components/` - Feature-specific React components
- `hooks/` - Custom hooks
- `store/` - Feature-specific Zustand store (if needed)
- `types/` - TypeScript types
- `utils/` - Utility functions
- `index.ts` - Barrel exports

Import from features: `import { useAuth, login } from '@/features/auth'`

### State Management

- **Zustand** for client-side global state (auth, UI state, search filters)
- **TanStack Query** for server state (API data fetching, caching, mutations)
- Auth state is persisted to cookies and hydrated on mount via `AuthInitializer`

### API Client

Located at `src/shared/lib/api/client.ts`. Provides `get`, `post`, `put`, `patch`, `del` functions with:
- Automatic token injection via `setTokenStorage` dependency injection
- 401 handling with automatic token refresh and request queuing
- Base URL `/api/v1` (proxied to backend via Next.js rewrites)

### Route Protection

`src/proxy.ts` is the Next.js middleware handling:
- Auth routes (`/sign-in`, `/sign-up`, etc.) redirect authenticated users to home
- Protected routes (`/dashboard`, `/booking`, `/profile`, `/become-partner`) redirect unauthenticated users to sign-in
- Admin routes require authentication (role check happens in layout)
- Automatic token refresh before expiry (60 second buffer)

### UI Components

Uses shadcn/ui with new-york style. Components installed to `src/shared/components/ui/`.

**Component Usage Priority:**
1. **Use existing shadcn/ui components first** - Always check `@/shared/components/ui/` for available components before creating new ones
2. **Extend existing components** - If a shadcn component needs customization, extend it rather than building from scratch
3. **Create new components only when necessary** - Only create new components when no existing shadcn component can fulfill the requirement

Install new shadcn components: `npx shadcn@latest add <component>`

Import UI components: `import { Button, Input, Card } from '@/shared/components/ui'`

### Path Aliases

- `@/*` maps to `./src/*`

## Commit Conventions

Uses conventional commits with commitlint. Pre-commit runs lint-staged (ESLint fix).

**Important:** Commit messages must NOT include Claude Code footer or Co-Authored-By lines - this is enforced by a custom commitlint rule.

Valid types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
