'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { fadeInUp, staggerContainer, cardPress } from '@/features/landing';

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string | null;
  sortOrder: number;
}

interface CompanionGalleryProps {
  galleries: GalleryItem[];
}

export function CompanionGallery({ galleries }: CompanionGalleryProps) {
  if (galleries.length === 0) {
    return null;
  }

  // Sort by sortOrder
  const sortedGallery = [...galleries].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <div>
      {/* Section Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-6"
      >
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
          Bộ Sưu Tập
        </p>
        <h2 className="font-display text-xl md:text-2xl font-medium text-charcoal">
          Hình Ảnh ({sortedGallery.length})
        </h2>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="columns-2 md:columns-3 gap-3 space-y-3"
      >
        {sortedGallery.map((item, index) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <motion.div
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="break-inside-avoid"
              >
                <motion.div
                  variants={cardPress}
                  className="relative cursor-pointer group rounded-xl overflow-hidden bg-white shadow-sm"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.caption || `Hình ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Caption on hover */}
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm">{item.caption}</p>
                    </div>
                  )}

                  {/* Camera icon indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                      <Camera className="size-3 text-charcoal" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2 bg-white">
              <Image
                src={item.imageUrl}
                alt={item.caption || `Hình ${index + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl"
              />
              {item.caption && (
                <p className="text-center text-charcoal-light mt-3 px-4">
                  {item.caption}
                </p>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </motion.div>
    </div>
  );
}
