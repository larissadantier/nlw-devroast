"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { highlightCode } from "@/lib/shiki";
import { detectLanguage, LANGUAGE_OPTIONS } from "@/lib/language-detect";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  onLanguageChange?: (language: string) => void;
  showHeader?: boolean;
  className?: string;
  maxHeight?: string;
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

function Content({ language = "typescript", code, maxHeight }: { language?: string; code: string; maxHeight?: string }) {
  const [highlightedCode, setHighlightedCode] = useState("");
  const lines = code.split("\n");
  const codeRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    highlightCode(code, language).then(setHighlightedCode);
  }, [code, language]);

  const handleScroll = () => {
    if (codeRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = codeRef.current.scrollTop;
    }
  };

  return (
    <div 
      className="flex bg-bg-input"
      style={maxHeight ? { maxHeight, overflow: "hidden" } : undefined}
    >
      <div 
        ref={lineNumbersRef}
        className="flex flex-col items-end pr-3 pl-3 py-3 min-w-10 border-r border-border-primary bg-bg-surface"
        style={maxHeight ? { overflowY: "hidden", maxHeight: `calc(${maxHeight} - 20px)`, scrollbarColor: "#10b981 transparent" } : { scrollbarColor: "#10b981 transparent" }}
      >
        {Array.from({ length: lines.length }, (_, i) => (
          <span key={i} className="font-mono text-xs text-zinc-500 leading-6">
            {i + 1}
          </span>
        ))}
      </div>
      <div 
        ref={codeRef}
        className="flex-1 p-3"
        style={maxHeight ? { overflowY: "auto", maxHeight: `calc(${maxHeight} - 20px)`, scrollbarColor: "#10b981 transparent" } : { scrollbarColor: "#10b981 transparent" }}
        onScroll={handleScroll}
        dangerouslySetInnerHTML={{ __html: highlightedCode }} 
      />
    </div>
  );
}

export function CodeBlock({ code, language: initialLanguage, onLanguageChange, showHeader = true, className, maxHeight }: CodeBlockProps) {
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

  const heightMatch = className?.match(/h-\[(\d+)px\]/);
  const extractedMaxHeight = heightMatch ? `${heightMatch[1]}px` : undefined;
  const effectiveMaxHeight = maxHeight || extractedMaxHeight;

  return (
    <Root className={className}>
      {showHeader && <Header language={language} onLanguageChange={handleLanguageChange} />}
      <Content language={language} code={code} maxHeight={effectiveMaxHeight} />
    </Root>
  );
}
