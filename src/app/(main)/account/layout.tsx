import { AccountSidebar } from '@/features/profile/components/account-sidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth check is handled by proxy.ts middleware
  return (
    <div className="bg-gray-50 py-8 min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* Sidebar - hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block lg:w-72 lg:shrink-0">
            <div className="sticky top-24 rounded-xl bg-white p-4 shadow-sm">
              <h2 className="mb-4 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tài khoản
              </h2>
              <AccountSidebar />
            </div>
          </aside>

          {/* Mobile navigation */}
          <div className="mb-6 lg:hidden">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <AccountSidebar />
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
