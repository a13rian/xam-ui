'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

interface CompanionHeroProps {
  coverImageUrl: string | null;
  videoIntroUrl: string | null;
  displayName: string;
}

export function CompanionHero({
  coverImageUrl,
  videoIntroUrl,
  displayName,
}: CompanionHeroProps) {
  return (
    <section className="relative h-[280px] md:h-[360px] bg-gradient-to-br from-gray-100 to-gray-200">
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={`Cover của ${displayName}`}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Video Intro Button */}
      {videoIntroUrl && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="absolute bottom-6 right-6 gap-2 rounded-full shadow-lg"
            >
              <Play className="size-4" />
              Xem video giới thiệu
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0">
            <video
              src={videoIntroUrl}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
