# AGENTS.md - Guidelines for Agentic Coding

Essential guidelines for AI agents working on this Next.js 16 companion booking app.

## Development Commands

```bash
# Core
bun run dev    # Start dev server (port 8100)
bun run build  # Build production (Turbopack)
bun run start  # Start production (port 3000)
bun run lint   # Run ESLint

# E2E Tests (Playwright)
bun run test:e2e          # Run all tests
bun run test:e2e:ui        # UI mode
bun run test:e2e:auth       # Auth tests only
bun run test:e2e:partner     # Partner tests
bun run test:e2e:headed     # Visible browser

# Single test
bunx playwright test tests/e2e/auth/sign-in.e2e.spec.ts
bunx playwright test --grep "Sign In"
```

## Code Style Guidelines

### Imports
Path alias: `@/*` → `./src/*`. Group imports: external libs → features → shared → components → relative

```tsx
import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/features/auth'
import { Button } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'
```

### Components
Client: add `'use client'` at top. Server: default (no directive). Default exports for pages, named for utilities.

```tsx
'use client'
interface Props { title: string; onClick?: () => void }
export function Component({ title, onClick }: Props) {
  return <div>{title}</div>
}
```

### TypeScript
Strict mode enabled. `interface` for objects, `type` for unions. Infer from Zod: `type Values = z.infer<typeof schema>`. Generic `<T>` for APIs.

```ts
interface ApiResponse<T> { data: T; message?: string }
type FormData = z.infer<typeof schema>
```

### Naming
Files: kebab-case. Components: PascalCase. Hooks: camelCase + `use` prefix. API: descriptive verbs. Variables: camelCase.

### File Structure (Feature Pattern)
```
src/features/feature/
├── api/          # *.api.ts (calls), *.queries.ts (hooks)
├── components/    # *.tsx
├── hooks/         # *.ts
├── store/         # Zustand stores
├── types/         # *.ts
└── index.ts       # Barrel exports
```
Import: `import { useAuth } from '@/features/auth'`

### API & Data Fetching
TanStack Query for server state, Zustand for client state.

```tsx
// API
export async function fetchCompanions(): Promise<Companion[]> {
  return get<Companion[]>('/companions', { skipAuth: true })
}

// Query
export function useCompanions() {
  return useQuery({
    queryKey: queryKeys.companions.list(),
    queryFn: fetchCompanions,
    staleTime: 5 * 60 * 1000,
  })
}
```

### Error Handling
`ApiError` type with `message` and `statusCode`. Try/catch with user-friendly fallback.

```tsx
try {
  await login(email, password)
} catch (err: unknown) {
  const msg = err && typeof err === 'object' && 'message' in err
    ? (err as ApiError).message
    : 'An error occurred'
  toast.error(msg)
}
```

### UI Components
Priority: shadcn/ui existing > extend > create new. Install: `npx shadcn@latest add <component>`

### Forms
`react-hook-form` + `zod` + `@hookform/resolvers/zodResolver`

```tsx
const schema = z.object({ email: z.string().email() })
type FormData = z.infer<typeof schema>
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { email: '' }
})
```

### App Router
Pages: `app/feature/page.tsx`. Dynamic: `app/[id]/page.tsx`. Layouts: `app/(group)/layout.tsx`. Groups: `(main)`, `(auth)`, `dashboard`, `admin`.

```tsx
export const metadata: Metadata = { title: 'Title', description: '...' }
export default function Page() { return <div>Content</div> }
```

### Styling
Tailwind v4 + `cn()` for conditionals. Custom colors: `bg-lavender`, `text-charcoal`, `bg-cream`. Radius: `rounded-[16px]`. Transitions: `transition-all duration-200`.

### Testing
E2E in `tests/e2e/` using Playwright. Use `data-testid` attributes. Test flows, not details.

```tsx
<Button data-testid="submit-button">Submit</Button>
```

### Important Notes
- Server Components default → `'use client'` only when needed
- Use `bun run lint` (no `next lint` command)
- Turbopack enabled by default (Next.js 16)
- Standalone build configured for Docker
- Vietnamese language (primary UI)
- Conventional commits (feat, fix, docs)

### Checklist
1. Check existing patterns
2. Follow feature structure
3. Use existing shadcn/ui
4. `bun run lint` && `bun run build`
5. Run relevant E2E tests
