import { AccountSidebar } from '@/features/profile/components/account-sidebar';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth check is handled by proxy.ts middleware
  return (
    <div className="min-h-[calc(100vh-64px)] bg-cream py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Sidebar - hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block lg:w-72 lg:shrink-0">
            <div className="sticky top-24 rounded-2xl border border-border/50 bg-background p-5">
              <h2 className="mb-4 px-3 font-display text-sm text-muted-foreground">
                Tài khoản
              </h2>
              <AccountSidebar />
            </div>
          </aside>

          {/* Mobile navigation */}
          <div className="mb-6 lg:hidden">
            <div className="rounded-2xl border border-border/50 bg-background p-4">
              <AccountSidebar />
            </div>
          </div>

          {/* Main content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
