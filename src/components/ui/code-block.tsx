"use client";

import { useMemo } from "react";
import { highlightCode } from "@/lib/shiki";
import { detectLanguage, LANGUAGE_OPTIONS } from "@/lib/language-detect";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  onLanguageChange?: (language: string) => void;
  className?: string;
}

function Root({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-lg border border-border-primary overflow-hidden", className)}>{children}</div>;
}

function Header({ filename, language, onLanguageChange }: { filename?: string; language?: string; onLanguageChange?: (lang: string) => void }) {
  return (
    <div className="flex items-center gap-3 h-10 px-4 border-b border-border-primary bg-bg-surface">
      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
      <div className="flex-1" />
      {filename && <span className="font-mono text-xs text-zinc-500">{filename}</span>}
      {onLanguageChange && (
        <select
          value={language || "auto"}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="font-mono text-xs bg-bg-input border border-border-primary rounded px-2 py-1 text-zinc-400 hover:text-zinc-200 cursor-pointer outline-none"
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

async function Content({ language = "typescript", code }: { language?: string; code: string }) {
  const highlightedCode = await highlightCode(code, language);
  const lines = code.split("\n");

  return (
    <div className="flex bg-bg-input">
      <div className="flex flex-col items-end pr-3 pl-3 py-3 min-w-10 border-r border-border-primary bg-bg-surface">
        {Array.from({ length: lines.length }, (_, i) => (
          <span key={i} className="font-mono text-xs text-zinc-500 leading-6">
            {i + 1}
          </span>
        ))}
      </div>
      <div className="flex-1 p-3 overflow-x-auto" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div>
  );
}

export function CodeBlock({ code, language: initialLanguage, onLanguageChange, className }: CodeBlockProps) {
  const detectedLanguage = useMemo(() => {
    if (!initialLanguage && code) {
      return detectLanguage(code);
    }
    return null;
  }, [code, initialLanguage]);

  const language = initialLanguage || detectedLanguage?.language || "typescript";

  const handleLanguageChange = (newLang: string) => {
    if (newLang === "auto") {
      const result = detectLanguage(code);
      onLanguageChange?.(result.language);
    } else {
      onLanguageChange?.(newLang);
    }
  };

  return (
    <Root className={className}>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <Content language={language} code={code} />
    </Root>
  );
}
