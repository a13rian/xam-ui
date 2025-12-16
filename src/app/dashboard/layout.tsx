import {
  DashboardSidebar,
  DashboardHeader,
  DashboardMobileNav,
} from '@/layouts/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth check is handled by proxy.ts middleware
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />
      <DashboardMobileNav />
      <main className="lg:pl-64 pt-0 transition-all duration-300">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
