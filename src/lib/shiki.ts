import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

const SUPPORTED_LANGS = [
  "typescript",
  "javascript",
  "tsx",
  "jsx",
  "json",
  "html",
  "css",
  "bash",
  "python",
  "rust",
  "go",
  "java",
  "c",
  "cpp",
  "csharp",
  "sql",
  "yaml",
  "markdown",
  "php",
  "swift",
  "kotlin",
  "dart",
  "ruby",
  "scala",
  "lua",
  "perl",
  "haskell",
  "elixir",
  "erlang",
  "clojure",
  "fsharp",
  "xml",
  "toml",
  "dockerfile",
  "makefile",
];

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["vesper"],
      langs: SUPPORTED_LANGS,
    });
  }
  return highlighter;
}

export async function highlightCode(code: string, lang: string = "typescript"): Promise<string> {
  const h = await getHighlighter();
  
  const normalizedLang = normalizeLanguage(lang);
  const isValidLang = SUPPORTED_LANGS.includes(normalizedLang);
  
  return h.codeToHtml(code, {
    lang: isValidLang ? normalizedLang : "typescript",
    theme: "vesper",
  });
}

function normalizeLanguage(lang: string): string {
  const aliases: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    rb: "ruby",
    rs: "rust",
    sh: "bash",
    shell: "bash",
    yml: "yaml",
    md: "markdown",
    cs: "csharp",
    fs: "fsharp",
  };
  
  return aliases[lang.toLowerCase()] || lang.toLowerCase();
}

export { SUPPORTED_LANGS };
