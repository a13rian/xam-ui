'use client';

import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { fadeInUp, staggerContainer } from '@/features/landing';

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
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
    >
      {/* Section Header */}
      <motion.div variants={fadeInUp} className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
          Giới Thiệu
        </p>
        <h2 className="font-display text-xl md:text-2xl font-medium text-charcoal">
          Về Tôi
        </h2>
      </motion.div>

      {/* Bio Content */}
      {hasBio && (
        <motion.div variants={fadeInUp} className={hasBadges ? 'mb-8' : ''}>
          <p className="text-charcoal-light leading-relaxed whitespace-pre-line text-base">
            {personalBio}
          </p>
        </motion.div>
      )}

      {/* Badges/Achievements */}
      {hasBadges && (
        <motion.div variants={fadeInUp}>
          <div className="flex items-center gap-2 mb-4">
            <Award className="size-5 text-lavender-dark" />
            <h3 className="font-medium text-charcoal">Thành Tích</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1.5 text-sm border-charcoal/20 text-charcoal hover:bg-cream-dark transition-colors"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
