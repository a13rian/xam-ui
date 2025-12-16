import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import {
  DashboardSidebar,
  DashboardHeader,
  DashboardMobileNav,
} from '@/components/layouts/dashboard';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    redirect('/sign-in?callbackUrl=/dashboard');
  }

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
