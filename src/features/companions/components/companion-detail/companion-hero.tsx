'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { fadeIn, premiumEase } from '@/features/landing';

interface CompanionHeroProps {
  coverImageUrl: string | null;
  videoIntroUrl: string | null;
  displayName: string;
  avatarUrl: string | null;
}

export function CompanionHero({
  coverImageUrl,
  videoIntroUrl,
  displayName,
  avatarUrl,
}: CompanionHeroProps) {
  return (
    <section className="relative h-[320px] md:h-[400px]">
      {/* Background */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute inset-0"
      >
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={`Cover của ${displayName}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-light" />
        )}
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Video Intro Button */}
      {videoIntroUrl && (
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: premiumEase }}
              className="absolute bottom-24 right-6 md:bottom-28 md:right-8"
            >
              <Button
                variant="secondary"
                className="gap-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
              >
                <Play className="size-4 fill-charcoal" />
                Xem video giới thiệu
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <video
              src={videoIntroUrl}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Avatar - overlapping bottom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: premiumEase }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0"
      >
        <div className="relative size-32 md:size-36 rounded-full overflow-hidden ring-4 ring-cream shadow-xl">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={displayName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-lavender to-lavender-dark flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {displayName.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
