"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { highlightCode } from "@/lib/shiki";
import { cn, tv, type VariantProps } from "@/lib/utils";

const diffLineVariants = tv({
  slots: {
    root: ["flex font-mono text-sm py-1 px-2"],
    prefix: ["w-5"],
    code: [],
  },
  variants: {
    variant: {
      removed: {
        root: "bg-diff-removed-bg",
        prefix: "text-diff-removed-text",
        code: "text-diff-removed-text",
      },
      added: {
        root: "bg-diff-added-bg",
        prefix: "text-diff-added-text",
        code: "text-diff-added-text",
      },
      context: {
        root: [],
        prefix: "text-zinc-500",
        code: [],
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
    language?: string;
    className?: string;
  };

function DiffLine({
  variant,
  prefix = " ",
  code,
  language = "javascript",
  className,
  ...props
}: DiffLineProps) {
  const [highlightedCode, setHighlightedCode] = useState("");
  const {
    root,
    prefix: prefixClass,
    code: codeClass,
  } = diffLineVariants({ variant });

  useEffect(() => {
    if (variant === "context") {
      highlightCode(code, language).then(setHighlightedCode);
    }
  }, [code, language, variant]);

  return (
    <div className={cn(root({ className }))} {...props}>
      <span className={cn(prefixClass())}>{prefix}</span>
      {variant === "context" && highlightedCode ? (
        <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      ) : (
        <span className={cn(codeClass())}>{code}</span>
      )}
    </div>
  );
}

export { DiffLine, type DiffLineProps, diffLineVariants };
