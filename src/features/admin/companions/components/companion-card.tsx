import { MoreHorizontal, Star } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface AdminCompanionCardProps {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  isVerified?: boolean;
}

export function AdminCompanionCard({
  name,
  location,
  rating,
  reviewCount,
  hourlyRate,
  isVerified = true,
}: AdminCompanionCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">{location}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          {isVerified && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Verified
            </span>
          )}
          <span className="text-sm font-semibold text-gray-900">
            ${hourlyRate}/hr
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
