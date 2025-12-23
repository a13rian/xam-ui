'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

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
  const sortedGallery = [...galleries].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Hình ảnh ({sortedGallery.length})
      </h2>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {sortedGallery.map((item, index) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <div className="relative break-inside-avoid cursor-pointer group rounded-xl overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.caption || `Hình ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">{item.caption}</p>
                  </div>
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2">
              <Image
                src={item.imageUrl}
                alt={item.caption || `Hình ${index + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />
              {item.caption && (
                <p className="text-center text-gray-600 mt-2">{item.caption}</p>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
