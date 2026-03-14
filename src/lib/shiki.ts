import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["vesper"],
      langs: ["typescript", "javascript", "tsx", "jsx", "json", "html", "css", "bash", "python", "rust", "go"],
    });
  }
  return highlighter;
}

export async function highlightCode(code: string, lang: string = "typescript"): Promise<string> {
  const h = await getHighlighter();
  return h.codeToHtml(code, {
    lang,
    theme: "vesper",
  });
}
