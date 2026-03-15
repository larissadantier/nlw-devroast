import hljs from 'highlight.js';

const LANGUAGE_ALIASES: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  rb: 'ruby',
  rs: 'rust',
  go: 'go',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  html: 'html',
  css: 'css',
  sql: 'sql',
  json: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  xml: 'xml',
  md: 'markdown',
  markdown: 'markdown',
  php: 'php',
  swift: 'swift',
  kotlin: 'kotlin',
  scala: 'scala',
  csharp: 'csharp',
  cs: 'csharp',
  dart: 'dart',
  lua: 'lua',
  r: 'r',
  perl: 'perl',
  haskell: 'haskell',
  elixir: 'elixir',
  erlang: 'erlang',
  clojure: 'clojure',
  fsharp: 'fsharp',
  fs: 'fsharp',
  rust: 'rust',
  toml: 'toml',
  dockerfile: 'dockerfile',
  makefile: 'makefile',
};

export interface DetectResult {
  language: string;
  confidence: number;
}

export function detectLanguage(code: string): DetectResult {
  if (!code || code.trim().length === 0) {
    return { language: 'typescript', confidence: 1 };
  }

  const result = hljs.highlightAuto(code);

  if (result.language && result.relevance !== undefined) {
    const relevance = result.relevance;

    if (relevance >= 3) {
      const normalizedLanguage = normalizeLanguage(result.language);
      return {
        language: normalizedLanguage,
        confidence: Math.min(relevance / 10, 1),
      };
    }
  }

  return { language: 'typescript', confidence: 1 };
}

function normalizeLanguage(language: string): string {
  return LANGUAGE_ALIASES[language.toLowerCase()] || language.toLowerCase();
}

export function getSupportedLanguages(): string[] {
  return [
    'javascript',
    'typescript',
    'python',
    'rust',
    'go',
    'java',
    'c',
    'cpp',
    'csharp',
    'html',
    'css',
    'sql',
    'json',
    'yaml',
    'bash',
    'shell',
    'markdown',
    'php',
    'swift',
    'kotlin',
    'dart',
  ];
}

export const LANGUAGE_OPTIONS = [
  { value: 'auto', label: 'Auto-detect' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'bash', label: 'Bash' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'dart', label: 'Dart' },
];
