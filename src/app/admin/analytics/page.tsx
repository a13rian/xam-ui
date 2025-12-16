import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Activity } from 'lucide-react';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    trend: 'up' as const,
    icon: DollarSign,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+15.2%',
    trend: 'up' as const,
    icon: Users,
  },
  {
    title: 'Bookings This Month',
    value: '1,234',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Calendar,
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-0.4%',
    trend: 'down' as const,
    icon: Activity,
  },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track platform performance and key metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = metric.trend === 'up' ? 'text-green-600' : 'text-red-600';

          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {metric.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center gap-1 text-xs ${trendColor} mt-1`}>
                  <TrendIcon className="h-3 w-3" />
                  <span>{metric.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Chart placeholder - Integrate with chart library</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Chart placeholder - Integrate with chart library</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Companions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-400 w-6">#{i}</span>
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Companion {i}</p>
                  <p className="text-sm text-gray-500">{50 - i * 5} bookings this month</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${1000 + i * 500}</p>
                  <p className="text-xs text-green-600">+{10 + i}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
