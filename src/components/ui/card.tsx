import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "@/lib/utils";

const cardVariants = tv({
  base: ["rounded-lg border border-border-primary p-5", "flex flex-col gap-3"],
  variants: {
    variant: {
      default: [],
      analysis: [],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type CardVariants = VariantProps<typeof cardVariants>;

type CardProps = ComponentProps<"div"> &
  CardVariants & {
    className?: string;
  };

function Card({ variant, className, children, ...props }: CardProps) {
  return (
    <div className={cardVariants({ variant, className })} {...props}>
      {children}
    </div>
  );
}

type CardHeaderProps = ComponentProps<"div"> & {
  className?: string;
};

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

type CardTitleProps = ComponentProps<"p"> & {
  className?: string;
};

function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <p
      className={cn("font-mono text-sm text-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

type CardDescriptionProps = ComponentProps<"p"> & {
  className?: string;
};

function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export {
  Card,
  CardDescription,
  CardHeader,
  type CardProps,
  CardTitle,
  type CardVariants,
};
