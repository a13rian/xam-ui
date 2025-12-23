'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Loader2, X, Upload } from 'lucide-react';
import { toast } from 'sonner';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/components/ui/avatar';
import { cn } from '@/shared/lib/utils';

interface AvatarUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  fallbackName?: string;
  className?: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function getInitials(name?: string): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function AvatarUpload({
  value,
  onChange,
  fallbackName,
  className,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);

  const handleFileSelect = useCallback(
    async (file: File) => {
      // Validate file type
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error('Vui lòng chọn file ảnh (JPG, PNG, hoặc WebP)');
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Kích thước file tối đa là 2MB');
        return;
      }

      setIsUploading(true);

      try {
        // Create preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // TODO: In real implementation, upload to server here
        // For now, we'll simulate a delay and use the object URL
        await new Promise((resolve) => setTimeout(resolve, 800));

        // In production, this would be the URL returned from the server
        onChange(objectUrl);
        toast.success('Đã tải ảnh lên thành công!');
      } catch {
        toast.error('Có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.');
        setPreviewUrl(value || null);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, value]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input value to allow re-selecting same file
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onChange(null);
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleInputChange}
        className="sr-only"
        aria-label="Upload avatar"
      />

      {/* Avatar container */}
      <div
        className={cn(
          'group relative cursor-pointer',
          isUploading && 'pointer-events-none'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="Click or drag to upload avatar"
      >
        <Avatar
          className={cn(
            'h-28 w-28 border-4 transition-all duration-300',
            isDragging
              ? 'border-lavender-dark scale-105'
              : 'border-charcoal/10 group-hover:border-lavender/50',
            previewUrl ? 'bg-cream' : 'bg-cream/50'
          )}
        >
          {previewUrl ? (
            <AvatarImage
              src={previewUrl}
              alt="Avatar preview"
              className="object-cover"
            />
          ) : null}
          <AvatarFallback className="bg-lavender/20 text-xl font-medium text-lavender-dark">
            {getInitials(fallbackName)}
          </AvatarFallback>
        </Avatar>

        {/* Overlay */}
        <AnimatePresence>
          {(isDragging || !previewUrl) && !isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                'absolute inset-0 flex flex-col items-center justify-center rounded-full transition-colors',
                isDragging
                  ? 'bg-lavender-dark/80'
                  : previewUrl
                    ? 'bg-charcoal/0 group-hover:bg-charcoal/50'
                    : 'bg-charcoal/30 group-hover:bg-charcoal/50'
              )}
            >
              {isDragging ? (
                <Upload className="h-8 w-8 text-white" />
              ) : (
                <Camera
                  className={cn(
                    'h-8 w-8 transition-opacity',
                    previewUrl
                      ? 'text-white opacity-0 group-hover:opacity-100'
                      : 'text-white'
                  )}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading overlay */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-charcoal/50">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}

        {/* Remove button */}
        {previewUrl && !isUploading && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110 hover:bg-red-600"
            aria-label="Remove avatar"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </div>

      {/* Helper text */}
      <div className="text-center">
        <p className="text-sm text-charcoal-light">
          {isDragging
            ? 'Thả ảnh vào đây'
            : previewUrl
              ? 'Click để thay đổi ảnh'
              : 'Click hoặc kéo thả ảnh'}
        </p>
        <p className="mt-0.5 text-xs text-charcoal-light/70">
          JPG, PNG, WebP (tối đa 2MB)
        </p>
      </div>
    </div>
  );
}
