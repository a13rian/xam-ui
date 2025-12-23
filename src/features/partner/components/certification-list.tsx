'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Award } from 'lucide-react';
import { Button, Input, Badge } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface CertificationListProps {
  value: string[];
  onChange: (certs: string[]) => void;
  maxItems?: number;
  className?: string;
}

const MAX_CERTIFICATIONS = 10;

export function CertificationList({
  value = [],
  onChange,
  maxItems = MAX_CERTIFICATIONS,
  className,
}: CertificationListProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (value.length >= maxItems) {
      return;
    }

    // Check for duplicates (case-insensitive)
    if (value.some((cert) => cert.toLowerCase() === trimmed.toLowerCase())) {
      return;
    }

    onChange([...value, trimmed]);
    setInputValue('');
  }, [inputValue, value, maxItems, onChange]);

  const handleRemove = useCallback(
    (index: number) => {
      const newCerts = value.filter((_, i) => i !== index);
      onChange(newCerts);
    },
    [value, onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const canAdd = inputValue.trim() && value.length < maxItems;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Existing certifications */}
      {value.length > 0 && (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {value.map((cert, index) => (
              <motion.div
                key={cert}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-2"
              >
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-charcoal/10 bg-white px-3 py-2 transition-colors group-hover:border-lavender/30 group-hover:bg-lavender/5">
                  <Award className="h-4 w-4 flex-shrink-0 text-lavender-dark" />
                  <span className="flex-1 text-sm text-charcoal">{cert}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-charcoal-light opacity-0 transition-all hover:bg-red-100 hover:text-red-500 group-hover:opacity-100"
                    aria-label={`Xóa chứng chỉ ${cert}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add new certification */}
      {value.length < maxItems && (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tên chứng chỉ..."
              className="border-charcoal/10 bg-cream/30 pr-20 focus:border-lavender-dark focus:ring-lavender/20"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-light/50">
              Enter để thêm
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleAdd}
            disabled={!canAdd}
            className={cn(
              'flex-shrink-0 border-charcoal/10 transition-colors',
              canAdd
                ? 'hover:border-lavender-dark hover:bg-lavender/10 hover:text-lavender-dark'
                : 'opacity-50'
            )}
            aria-label="Thêm chứng chỉ"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Counter and hint */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-charcoal-light/70">
          {value.length === 0
            ? 'Chưa có chứng chỉ nào'
            : `${value.length} chứng chỉ`}
        </span>
        {value.length >= maxItems ? (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-700 hover:bg-amber-100"
          >
            Đã đạt giới hạn {maxItems}
          </Badge>
        ) : (
          <span className="text-charcoal-light/50">
            Tối đa {maxItems} chứng chỉ
          </span>
        )}
      </div>

      {/* Empty state hint */}
      {value.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-dashed border-charcoal/10 bg-cream/30 p-4 text-center"
        >
          <Award className="mx-auto mb-2 h-8 w-8 text-charcoal-light/40" />
          <p className="text-sm text-charcoal-light">
            Thêm các chứng chỉ, bằng cấp hoặc khóa học bạn đã hoàn thành
          </p>
          <p className="mt-1 text-xs text-charcoal-light/70">
            Ví dụ: Chứng chỉ tư vấn tâm lý, Khóa học lắng nghe chủ động...
          </p>
        </motion.div>
      )}
    </div>
  );
}
