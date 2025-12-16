'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          // Normal toast
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          // Success toast - Green
          '--success-bg': '#f0fdf4',
          '--success-text': '#166534',
          '--success-border': '#bbf7d0',
          // Error toast - Red
          '--error-bg': '#fef2f2',
          '--error-text': '#dc2626',
          '--error-border': '#fecaca',
          // Warning toast - Amber
          '--warning-bg': '#fffbeb',
          '--warning-text': '#d97706',
          '--warning-border': '#fde68a',
          // Info toast - Blue
          '--info-bg': '#eff6ff',
          '--info-text': '#2563eb',
          '--info-border': '#bfdbfe',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
