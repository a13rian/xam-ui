import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { CompanionBadge } from "@/types/companion";

const badgeVariants = cva(
  "absolute top-3 left-3 z-10 px-2 py-1 text-xs font-semibold rounded-full",
  {
    variants: {
      type: {
        verified: "bg-white text-gray-900 shadow-sm",
        popular: "bg-white text-gray-900 shadow-sm",
        new: "bg-white text-gray-900 shadow-sm",
      },
    },
    defaultVariants: {
      type: "verified",
    },
  }
);

interface CompanionCardBadgeProps
  extends VariantProps<typeof badgeVariants> {
  badge: CompanionBadge;
  className?: string;
}

export function CompanionCardBadge({
  badge,
  className,
}: CompanionCardBadgeProps) {
  const labels: Record<CompanionBadge, string> = {
    verified: "Đã xác minh",
    popular: "Phổ biến",
    new: "Mới",
  };

  return (
    <span className={cn(badgeVariants({ type: badge }), className)}>
      {labels[badge]}
    </span>
  );
}

