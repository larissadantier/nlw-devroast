"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/code-editor";
import { Toggle } from "@/components/ui/toggle";

const EXAMPLE_CODE = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }

  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }

  // TODO: handle tax calculation
  // TODO: handle currency conversion

  return total;
}`;

const leaderboardEntries = [
  {
    rank: 1,
    score: 1.2,
    lines: ['eval(prompt("enter code"))', "document.write(response)", "// trust the user lol"],
    language: "javascript",
  },
  {
    rank: 2,
    score: 1.8,
    lines: ["if (x == true) { return true; }", "else if (x == false) { return false; }", "else { return !false; }"],
    language: "typescript",
  },
  {
    rank: 3,
    score: 2.1,
    lines: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
    language: "sql",
  },
];

function scoreColor(score: number): string {
  if (score <= 3) return "text-accent-red";
  if (score <= 6) return "text-accent-amber";
  return "text-accent-green";
}

export default function Home() {
  const [code, setCode] = useState(EXAMPLE_CODE);
  const [language, setLanguage] = useState<string | undefined>(undefined);

  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full max-w-240 flex flex-col gap-12 px-10 pt-20 pb-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-[36px] font-bold font-mono leading-tight text-center">
            <span className="text-accent-green">$ </span>
            <span className="text-foreground">paste your code. get roasted.</span>
          </h1>
          <p className="text-center font-mono text-sm text-zinc-500 dark:text-zinc-400">{`// drop your code below and we'll rate it — brutally honest or full roast mode`}</p>
        </div>

        <CodeEditor value={code} onChange={setCode} language={language} onLanguageChange={setLanguage} />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Toggle />
            <span className="font-mono text-sm text-accent-green">roast mode</span>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{`// maximum sarcasm enabled`}</span>
          </div>
          <Button radius="none">
            <span>$</span> roast_my_code
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6">
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">2,847 codes roasted</span>
          <span className="text-zinc-500 dark:text-zinc-400">·</span>
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">avg score: 4.2/10</span>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-lg font-bold text-foreground">
              <span className="text-accent-green">{`//`} </span>
              shame_leaderboard
            </h2>
            <Button variant="secondary" radius="none" size="sm">
              <span>$</span> {`view all >>`}
            </Button>
          </div>

          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{`// the worst code on the internet, ranked by shame`}</p>

          <div className="border border-border-primary w-full">
            <div className="flex items-center h-10 px-5 bg-bg-surface border-b border-border-primary">
              <span className="w-12 font-mono text-xs font-medium text-text-tertiary">#</span>
              <span className="w-18 font-mono text-xs font-medium text-text-tertiary">score</span>
              <span className="flex-1 font-mono text-xs font-medium text-text-tertiary">code</span>
              <span className="w-24 font-mono text-xs font-medium text-text-tertiary text-right">lang</span>
            </div>

            {leaderboardEntries.map((entry, index) => (
              <div key={entry.rank} className={`flex px-5 py-4 ${index < leaderboardEntries.length - 1 ? "border-b border-border-primary" : ""}`}>
                <span className={`w-12 font-mono text-xs ${entry.rank === 1 ? "text-accent-amber" : "text-text-secondary"}`}>{entry.rank}</span>
                <span className={`w-18 font-mono text-xs font-bold ${scoreColor(entry.score)}`}>{entry.score.toFixed(1)}</span>
                <div className="flex-1 flex flex-col gap-0.5">
                  {entry.lines.map((line) => (
                    <span key={line} className={`font-mono text-xs ${line.startsWith("//") || line.startsWith("--") ? "text-text-tertiary" : "text-text-primary"}`}>
                      {line}
                    </span>
                  ))}
                </div>
                <span className="w-24 font-mono text-xs text-text-secondary text-right">{entry.language}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 py-4">
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">showing top 3 of 2,847</span>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">·</span>
            <Button variant="link" size="sm" className="p-0 text-xs">
              view full leaderboard &gt;&gt;
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
