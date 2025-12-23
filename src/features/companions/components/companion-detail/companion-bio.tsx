'use client';

import { Badge } from '@/shared/components/ui/badge';

interface CompanionBioProps {
  personalBio: string | null;
  badges: string[];
}

export function CompanionBio({ personalBio, badges }: CompanionBioProps) {
  const hasBio = !!personalBio;
  const hasBadges = badges.length > 0;

  if (!hasBio && !hasBadges) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Bio Section */}
      {hasBio && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Giới thiệu
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {personalBio}
          </p>
        </section>
      )}

      {/* Badges */}
      {hasBadges && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Thành tích
          </h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                {badge}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
