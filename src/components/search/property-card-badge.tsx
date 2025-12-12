import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { PropertyBadge } from "@/types/property";

const badgeVariants = cva(
  "absolute top-3 left-3 z-10 px-2 py-1 text-xs font-semibold rounded-full",
  {
    variants: {
      type: {
        superhost: "bg-white text-gray-900 shadow-sm",
        "guest-favorite": "bg-white text-gray-900 shadow-sm",
      },
    },
    defaultVariants: {
      type: "superhost",
    },
  }
);

interface PropertyCardBadgeProps
  extends VariantProps<typeof badgeVariants> {
  badge: PropertyBadge;
  className?: string;
}

export function PropertyCardBadge({
  badge,
  className,
}: PropertyCardBadgeProps) {
  const labels: Record<PropertyBadge, string> = {
    superhost: "Superhost",
    "guest-favorite": "Guest favorite",
  };

  return (
    <span className={cn(badgeVariants({ type: badge }), className)}>
      {labels[badge]}
    </span>
  );
}
