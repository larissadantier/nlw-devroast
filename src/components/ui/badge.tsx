import type { ComponentProps } from "react";
import { tv, type VariantProps } from "@/lib/utils";

const badgeVariants = tv({
  slots: {
    root: ["inline-flex items-center gap-2", "font-mono"],
    dot: ["rounded-full", "flex-shrink-0"],
  },
  variants: {
    variant: {
      critical: {
        root: "text-accent-red",
        dot: "bg-accent-red",
      },
      warning: {
        root: "text-accent-amber",
        dot: "bg-accent-amber",
      },
      good: {
        root: "text-accent-green",
        dot: "bg-accent-green",
      },
      verdict: {
        root: "text-accent-red",
        dot: "bg-accent-red",
      },
    },
    size: {
      sm: {
        root: "text-xs",
        dot: "h-1.5 w-1.5",
      },
      md: {
        root: "text-sm",
        dot: "h-2 w-2",
      },
      lg: {
        root: "text-base",
        dot: "h-2.5 w-2.5",
      },
    },
  },
  defaultVariants: {
    variant: "critical",
    size: "md",
  },
});

type BadgeVariants = VariantProps<typeof badgeVariants>;

type BadgeProps = ComponentProps<"span"> &
  BadgeVariants & {
    className?: string;
  };

function Badge({ variant, size, className, children, ...props }: BadgeProps) {
  const { root, dot } = badgeVariants({ variant, size });

  return (
    <span className={root({ className })} {...props}>
      <span className={dot()} />
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeVariants, badgeVariants };
