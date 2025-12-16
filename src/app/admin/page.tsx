import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Users, UserCircle, Calendar, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Active Companions',
    value: '89',
    change: '+5%',
    changeType: 'positive' as const,
    icon: UserCircle,
  },
  {
    title: 'Total Bookings',
    value: '456',
    change: '+18%',
    changeType: 'positive' as const,
    icon: Calendar,
  },
  {
    title: 'Revenue',
    value: '$12,345',
    change: '+8%',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your platform&apos;s performance and key metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New user registration
                </p>
                <p className="text-xs text-gray-500">John Doe joined the platform</p>
              </div>
              <span className="text-xs text-gray-400">2 min ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Booking completed
                </p>
                <p className="text-xs text-gray-500">Booking #1234 was completed</p>
              </div>
              <span className="text-xs text-gray-400">15 min ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New companion application
                </p>
                <p className="text-xs text-gray-500">Jane Smith applied to become a companion</p>
              </div>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
