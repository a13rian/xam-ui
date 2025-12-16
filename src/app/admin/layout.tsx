import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import {
  AdminSidebar,
  AdminHeader,
  AdminMobileNav,
} from '@/layouts/admin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    redirect('/sign-in?callbackUrl=/admin');
  }

  // TODO: Add role check for admin access
  // const user = await getCurrentUser();
  // if (!user?.roleIds?.includes('admin')) {
  //   redirect('/dashboard');
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <AdminSidebar />
      <AdminMobileNav />
      <main className="lg:pl-64 pt-0 transition-all duration-300">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
