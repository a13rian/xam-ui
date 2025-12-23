'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle, Globe } from 'lucide-react';
import { Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

type Platform = 'facebook' | 'instagram' | 'tiktok' | 'website';

interface SocialMediaInputProps {
  platform: Platform;
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

const platformConfig: Record<
  Platform,
  {
    icon: React.FC<{ className?: string }>;
    placeholder: string;
    urlPattern: RegExp;
    color: string;
    bgColor: string;
  }
> = {
  facebook: {
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    placeholder: 'https://facebook.com/username',
    urlPattern: /^https?:\/\/(www\.)?(facebook|fb)\.(com|me)\/.+/i,
    color: 'text-[#1877F2]',
    bgColor: 'bg-[#1877F2]/10',
  },
  instagram: {
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    placeholder: 'https://instagram.com/username',
    urlPattern: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
    color: 'text-[#E4405F]',
    bgColor: 'bg-[#E4405F]/10',
  },
  tiktok: {
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    placeholder: 'https://tiktok.com/@username',
    urlPattern: /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\/.+/i,
    color: 'text-charcoal',
    bgColor: 'bg-charcoal/10',
  },
  website: {
    icon: Globe,
    placeholder: 'https://example.com',
    urlPattern: /^https?:\/\/.+\..+/i,
    color: 'text-lavender-dark',
    bgColor: 'bg-lavender/10',
  },
};

export function SocialMediaInput({
  platform,
  value = '',
  onChange,
  className,
}: SocialMediaInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const config = platformConfig[platform];
  const Icon = config.icon;

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const validationState = useMemo(() => {
    if (!inputValue.trim()) return 'empty';
    if (config.urlPattern.test(inputValue)) return 'valid';
    return 'invalid';
  }, [inputValue, config.urlPattern]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Auto-add https:// if missing
    if (inputValue && !inputValue.startsWith('http')) {
      const correctedValue = `https://${inputValue}`;
      setInputValue(correctedValue);
      onChange(correctedValue);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-center gap-0 overflow-hidden rounded-lg border transition-all duration-200',
          isFocused
            ? 'border-lavender-dark ring-2 ring-lavender/20'
            : validationState === 'invalid'
              ? 'border-red-300'
              : 'border-charcoal/10 hover:border-charcoal/20'
        )}
      >
        {/* Platform icon */}
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center transition-colors',
            isFocused || validationState === 'valid'
              ? config.bgColor
              : 'bg-cream/50'
          )}
        >
          <Icon
            className={cn(
              'h-5 w-5 transition-colors',
              isFocused || validationState === 'valid'
                ? config.color
                : 'text-charcoal-light'
            )}
          />
        </div>

        {/* Input */}
        <Input
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={config.placeholder}
          className="flex-1 border-0 bg-cream/30 px-3 shadow-none focus-visible:ring-0"
        />

        {/* Validation indicator */}
        <AnimatePresence mode="wait">
          {validationState !== 'empty' && (
            <motion.div
              key={validationState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center"
            >
              {validationState === 'valid' ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Validation message */}
      <AnimatePresence>
        {validationState === 'invalid' && !isFocused && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 text-xs text-amber-600"
          >
            URL không đúng định dạng. Ví dụ: {config.placeholder}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
