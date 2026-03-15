"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createHighlighter } from "shiki";
import { LANGUAGES, TIER_1_LANGUAGES, type LanguageKey } from "@/lib/languages";

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

async function createShikiHighlighter() {
  if (highlighterPromise) {
    return highlighterPromise;
  }

  highlighterPromise = createHighlighter({
    themes: ["vesper"],
    langs: [...TIER_1_LANGUAGES],
  });

  return highlighterPromise;
}

interface UseShikiHighlighterReturn {
  highlight: (code: string, lang: string) => Promise<string>;
  isReady: boolean;
  loadLanguage: (lang: LanguageKey) => Promise<void>;
}

export function useShikiHighlighter(): UseShikiHighlighterReturn {
  const [isReady, setIsReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const highlighterRef = useRef<any>(null);
  const loadedLanguagesRef = useRef<Set<string>>(new Set([...TIER_1_LANGUAGES]));

  useEffect(() => {
    let mounted = true;

    createShikiHighlighter()
      .then((highlighter) => {
        if (mounted) {
          highlighterRef.current = highlighter;
          setIsReady(true);
        }
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  const loadLanguageInternal = useCallback(
    async (lang: LanguageKey): Promise<void> => {
      if (!highlighterRef.current || loadedLanguagesRef.current.has(lang)) {
        return;
      }

      const langConfig = LANGUAGES[lang];
      if (!langConfig) {
        return;
      }

      try {
        const langModule = await langConfig.src();
        await highlighterRef.current.loadLanguage(langModule);
        loadedLanguagesRef.current.add(lang);
      } catch (error) {
        console.error(`Failed to load language ${lang}:`, error);
      }
    },
    []
  );

  const highlight = useCallback(
    async (code: string, lang: string): Promise<string> => {
      if (!highlighterRef.current) {
        return code;
      }

      const normalizedLang = lang.toLowerCase();

      if (!loadedLanguagesRef.current.has(normalizedLang)) {
        await loadLanguageInternal(normalizedLang as LanguageKey);
      }

      const langConfig = LANGUAGES[normalizedLang as LanguageKey];
      const shikiLang = langConfig?.shikiId || "plaintext";

      try {
        const html = await highlighterRef.current.codeToHtml(code, {
          lang: shikiLang,
          theme: "vesper",
        });
        return html;
      } catch {
        const html = await highlighterRef.current.codeToHtml(code, {
          lang: "plaintext",
          theme: "vesper",
        });
        return html;
      }
    },
    [loadLanguageInternal]
  );

  const loadLanguage = useCallback(
    async (lang: LanguageKey): Promise<void> => {
      await loadLanguageInternal(lang);
    },
    [loadLanguageInternal]
  );

  return {
    highlight,
    isReady,
    loadLanguage,
  };
}
