import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "@/lib/utils";

const diffLineVariants = tv({
  slots: {
    root: ["flex font-mono text-sm py-1 px-2"],
    prefix: [],
    code: [],
  },
  variants: {
    variant: {
      removed: {
        root: "bg-[#1A0A0A]",
        prefix: "text-accent-red",
        code: "text-zinc-400",
      },
      added: {
        root: "bg-[#0A1A0F]",
        prefix: "text-accent-green",
        code: "text-foreground",
      },
      context: {
        root: [],
        prefix: "text-zinc-500",
        code: "text-zinc-500",
      },
    },
  },
  defaultVariants: {
    variant: "context",
  },
});

type DiffLineVariants = VariantProps<typeof diffLineVariants>;

type DiffLineProps = ComponentProps<"div"> &
  DiffLineVariants & {
    prefix?: string;
    code: string;
    className?: string;
  };

function DiffLine({
  variant,
  prefix = " ",
  code,
  className,
  ...props
}: DiffLineProps) {
  const {
    root,
    prefix: prefixClass,
    code: codeClass,
  } = diffLineVariants({ variant });

  return (
    <div className={root({ className })} {...props}>
      <span className={cn("w-5", prefixClass())}>{prefix}</span>
      <span className={codeClass()}>{code}</span>
    </div>
  );
}

export { DiffLine, type DiffLineProps, type DiffLineVariants };
