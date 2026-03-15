"use client";

import { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import { LANGUAGES, type LanguageKey } from "@/lib/languages";

const RELEVANCE_THRESHOLD = 1;

interface UseLanguageDetectionReturn {
  detectedLanguage: string | null;
  confidence: number;
  isDetecting: boolean;
}

export function useLanguageDetection(code: string): UseLanguageDetectionReturn {
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!code || code.trim().length === 0) {
      setDetectedLanguage(null); // eslint-disable-line react-hooks/set-state-in-effect
      setConfidence(0);  
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    timeoutRef.current = setTimeout(() => {
      const langKeys = Object.keys(LANGUAGES) as readonly LanguageKey[];
      const result = hljs.highlightAuto(code, [...langKeys]);

      if (controller.signal.aborted) {
        return;
      }

      if (result.language && result.relevance >= RELEVANCE_THRESHOLD) {
        const normalizedLang = normalizeLanguage(result.language);
        setDetectedLanguage(normalizedLang);  
        setConfidence(Math.min(result.relevance / 10, 1));  
      } else {
        setDetectedLanguage(null);  
        setConfidence(0);  
      }

      setIsDetecting(false);  
    }, 50);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      controller.abort();
    };
  }, [code]);

  return {
    detectedLanguage,
    confidence,
    isDetecting,
  };
}

function normalizeLanguage(language: string): string {
  const langKey = language.toLowerCase() as LanguageKey;
  const langConfig = LANGUAGES[langKey];
  
  if (langConfig) {
    return langKey;
  }
  
  for (const [key, config] of Object.entries(LANGUAGES)) {
    if ((config.aliases as readonly string[]).includes(language.toLowerCase())) {
      return key;
    }
  }
  
  return "plaintext";
}
