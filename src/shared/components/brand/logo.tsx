import { cn } from '@/shared/lib/utils';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type LogoVariant = 'default' | 'withTagline';

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
  /** Use light colors (for dark backgrounds) */
  inverted?: boolean;
}

const sizeConfig: Record<LogoSize, { text: string; tagline: string }> = {
  xs: { text: 'text-base', tagline: 'text-[9px]' },
  sm: { text: 'text-lg', tagline: 'text-[10px]' },
  md: { text: 'text-xl', tagline: 'text-xs' },
  lg: { text: 'text-2xl', tagline: 'text-sm' },
  xl: { text: 'text-3xl', tagline: 'text-base' },
};

/**
 * Typography-only Logo for "Chuyện Xàm"
 * Premium, elegant serif typography
 */
export function Logo({
  size = 'md',
  variant = 'default',
  className,
  inverted = false,
}: LogoProps) {
  const config = sizeConfig[size];

  const textColorClass = inverted ? 'text-white' : 'text-charcoal';
  const taglineColorClass = inverted ? 'text-white/60' : 'text-charcoal-light';

  return (
    <div className={cn('flex flex-col', className)}>
      <span
        className={cn(
          'font-display font-normal tracking-tight leading-none',
          config.text,
          textColorClass
        )}
      >
        Chuyện Xàm
      </span>
      {variant === 'withTagline' && (
        <span
          className={cn(
            'mt-1 font-sans tracking-wide uppercase leading-none',
            config.tagline,
            taglineColorClass
          )}
        >
          Nơi tâm sự thăng hoa
        </span>
      )}
    </div>
  );
}
