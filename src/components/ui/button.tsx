import type { ComponentProps } from "react";
import { tv, type VariantProps } from "@/lib/utils";

const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "font-mono font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  variants: {
    variant: {
      primary: [
        "bg-accent-green",
        "text-[#0A0A0A]",
        "hover:bg-accent-green/90",
      ],
      secondary: [
        "border border-zinc-300 dark:border-zinc-700",
        "bg-transparent",
        "text-zinc-900 dark:text-zinc-100",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
      ],
      link: [
        "bg-transparent",
        "text-zinc-500 dark:text-zinc-400",
        "hover:text-zinc-900 dark:hover:text-zinc-100",
      ],
      danger: ["bg-accent-red", "text-white", "hover:bg-accent-red/90"],
    },
    size: {
      sm: ["px-4", "py-1.5", "text-sm"],
      md: ["px-6", "py-2.5", "text-[13px]"],
      lg: ["px-8", "py-3", "text-base"],
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    radius: "full",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentProps<"button"> &
  ButtonVariants & {
    className?: string;
  };

function Button({ variant, size, radius, className, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, radius, className })}
      {...props}
    />
  );
}

export { Button, type ButtonProps, type ButtonVariants, buttonVariants };
