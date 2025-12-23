'use client';

import { useCallback, useEffect, useState, useRef } from 'react';

interface FormDraftOptions {
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Storage key prefix */
  prefix?: string;
}

interface FormDraftReturn<T> {
  /** Save draft to localStorage */
  saveDraft: (data: T) => void;
  /** Load draft from localStorage */
  loadDraft: () => T | null;
  /** Clear draft from localStorage */
  clearDraft: () => void;
  /** Check if draft exists */
  hasDraft: boolean;
  /** Timestamp of last draft */
  lastSaved: Date | null;
}

const DEFAULT_OPTIONS: FormDraftOptions = {
  debounceMs: 500,
  prefix: 'form-draft',
};

/**
 * Hook for auto-saving form data to localStorage
 *
 * @example
 * ```tsx
 * const { saveDraft, loadDraft, clearDraft, hasDraft } = useFormDraft<FormValues>('partner-register');
 *
 * // Load draft on mount
 * useEffect(() => {
 *   const draft = loadDraft();
 *   if (draft) {
 *     form.reset(draft);
 *   }
 * }, []);
 *
 * // Auto-save on change
 * useEffect(() => {
 *   const subscription = form.watch((data) => {
 *     saveDraft(data as FormValues);
 *   });
 *   return () => subscription.unsubscribe();
 * }, [form, saveDraft]);
 *
 * // Clear on successful submit
 * const onSubmit = async (data) => {
 *   await submitForm(data);
 *   clearDraft();
 * };
 * ```
 */
// Helper to safely read from localStorage (SSR-safe)
function getStorageItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useFormDraft<T>(
  key: string,
  options: FormDraftOptions = {}
): FormDraftReturn<T> {
  const { debounceMs, prefix } = { ...DEFAULT_OPTIONS, ...options };
  const storageKey = `${prefix}:${key}`;
  const timestampKey = `${prefix}:${key}:timestamp`;

  // Use lazy initialization to read from localStorage on mount
  const [hasDraft, setHasDraft] = useState(() => !!getStorageItem(storageKey));
  const [lastSaved, setLastSaved] = useState<Date | null>(() => {
    const timestamp = getStorageItem(timestampKey);
    return timestamp ? new Date(timestamp) : null;
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save draft with debounce
  const saveDraft = useCallback(
    (data: T) => {
      if (typeof window === 'undefined') return;

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce the save
      timeoutRef.current = setTimeout(() => {
        try {
          const now = new Date();
          localStorage.setItem(storageKey, JSON.stringify(data));
          localStorage.setItem(timestampKey, now.toISOString());
          setHasDraft(true);
          setLastSaved(now);
        } catch {
          // localStorage full or not available
          console.warn('Failed to save form draft to localStorage');
        }
      }, debounceMs);
    },
    [storageKey, timestampKey, debounceMs]
  );

  // Load draft
  const loadDraft = useCallback((): T | null => {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch {
      // Invalid JSON or localStorage not available
    }
    return null;
  }, [storageKey]);

  // Clear draft
  const clearDraft = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Clear any pending save
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(timestampKey);
      setHasDraft(false);
      setLastSaved(null);
    } catch {
      // localStorage not available
    }
  }, [storageKey, timestampKey]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    hasDraft,
    lastSaved,
  };
}

/**
 * Format relative time for "last saved" display
 */
export function formatLastSaved(date: Date | null): string {
  if (!date) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffSec < 60) {
    return 'vừa xong';
  } else if (diffMin < 60) {
    return `${diffMin} phút trước`;
  } else if (diffHour < 24) {
    return `${diffHour} giờ trước`;
  } else {
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'short',
    });
  }
}
