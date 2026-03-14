import type { ComponentProps, ReactNode } from "react";
import { highlightCode } from "@/lib/shiki";
import { cn } from "@/lib/utils";

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-primary overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CodeBlockHeader({ filename }: { filename?: string }) {
  return (
    <div className="flex items-center gap-3 h-10 px-4 border-b border-border-primary">
      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
      <div className="flex-1" />
      {filename && (
        <span className="font-mono text-xs text-zinc-500">{filename}</span>
      )}
    </div>
  );
}

async function CodeBlockContent({
  language = "typescript",
  children,
  className,
}: {
  language?: string;
  children: ReactNode;
  className?: string;
}) {
  const codeContent = typeof children === "string" ? children : "";
  const highlightedCode = await highlightCode(codeContent, language);
  const lines = codeContent.split("\n");

  return (
    <div className={cn("flex bg-bg-input", className)}>
      <div className="flex flex-col items-end pr-3 pl-3 py-3 min-w-10 border-r border-border-primary bg-bg-surface">
        {Array.from({ length: lines.length }, (_, i) => (
          <span key={i} className="font-mono text-xs text-zinc-500 leading-6">
            {i + 1}
          </span>
        ))}
      </div>
      <div
        className="flex-1 p-3 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}

export { CodeBlock, CodeBlockContent, CodeBlockHeader };
