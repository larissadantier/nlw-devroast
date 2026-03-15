import { highlightCode } from "@/lib/shiki";

const leaderboardData = [
  {
    rank: 1,
    score: 1.2,
    code: 'eval(prompt("enter code"))\ndocument.write(response)\n// trust the user lol',
    language: "javascript",
    lines: 3,
  },
  {
    rank: 2,
    score: 1.8,
    code: "if (x == true) { return true; }\nelse if (x == false) { return false; }\nelse { return !false; }",
    language: "typescript",
    lines: 3,
  },
  {
    rank: 3,
    score: 2.1,
    code: "SELECT * FROM users WHERE 1=1\n-- TODO: add authentication",
    language: "sql",
    lines: 2,
  },
  {
    rank: 4,
    score: 2.8,
    code: "try { doSomething() }\ncatch (e) { /* silent fail */ }\nfinally { console.log('ok') }",
    language: "javascript",
    lines: 3,
  },
  {
    rank: 5,
    score: 3.4,
    code: "const foo = require('./bar')\nmodule.exports = foo",
    language: "javascript",
    lines: 2,
  },
];

function getScoreColor(score: number): string {
  if (score <= 3) return "text-accent-red";
  if (score <= 6) return "text-accent-amber";
  return "text-accent-green";
}

async function CodeContent({ code, language }: { code: string; language: string }) {
  const highlightedCode = await highlightCode(code, language);

  return (
    <div className="flex h-30 bg-bg-input" style={{ scrollbarColor: '#10b981 transparent' }}>
      <div className="w-10 flex flex-col items-end gap-1.5 px-2.5 py-3 border-r border-border-primary bg-bg-surface">
        {code.split("\n").map((_, i) => (
          <span key={i} className="font-mono text-xs text-text-tertiary leading-7">
            {i + 1}
          </span>
        ))}
      </div>
      <div
        className="flex-1 p-4 gap-1.5 overflow-auto"
        style={{ scrollbarColor: '#10b981 transparent' }}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}

export default async function LeaderboardPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full max-w-360 flex flex-col gap-10 px-20 pt-10 pb-10">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-8xl font-bold text-accent-green">&gt;</span>
            <h1 className="font-mono text-7xl font-bold text-text-primary">
              shame_leaderboard
            </h1>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            {'// the most roasted code on the internet'}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-tertiary">2,847 submissions</span>
            <span className="font-mono text-xs text-text-tertiary">·</span>
            <span className="font-mono text-xs text-text-tertiary">avg score: 4.2/10</span>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          {leaderboardData.map((entry) => (
            <div
              key={entry.rank}
              className="flex flex-col border border-border-primary bg-bg-surface"
            >
              <div className="flex items-center justify-between h-12 px-5 border-b border-border-primary">
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-sm font-bold text-accent-amber`}>
                    #{entry.rank}
                  </span>
                  <span className={`font-mono text-xs font-bold ${getScoreColor(entry.score)}`}>
                    score: {entry.score.toFixed(1)}/10
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-text-secondary">
                    {entry.language}
                  </span>
                  <span className="font-mono text-xs text-text-tertiary">
                    {entry.lines} lines
                  </span>
                </div>
              </div>
              <CodeContent code={entry.code} language={entry.language} />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
