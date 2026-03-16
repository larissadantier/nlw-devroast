import { ScoreRing } from "@/components/ui/score-ring";
import { CodeBlock } from "@/components/ui/code-block";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DiffLine } from "@/components/ui/diff-line";
import { Button } from "@/components/ui/button";

const roastData = {
  score: 3.5,
  verdict: "needs_serious_help",
  verdictLabel: "verdict: needs_serious_help",
  title: '"this code looks like it was written during a power outage... in 2005."',
  language: "javascript",
  lines: 7,
  code: `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  }
  
  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }
  
  // TODO: handle tax calculation
  // TODO: handle currency conversion

  return total;
}`,
  issues: [
    {
      severity: "critical",
      title: "using var instead of const/let",
      description:
        "var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
    },
    {
      severity: "warning",
      title: "imperative loop pattern",
      description:
        "for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
    },
    {
      severity: "good",
      title: "clear naming conventions",
      description:
        "calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
    },
    {
      severity: "good",
      title: "single responsibility",
      description:
        "the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
    },
  ],
  diffLines: [
    { type: "context", code: "function calculateTotal(items) {" },
    { type: "removed", prefix: "-", code: "  var total = 0;" },
    { type: "removed", prefix: "-", code: "  for (var i = 0; i < items.length; i++) {" },
    { type: "removed", prefix: "-", code: "    total = total + items[i].price;" },
    { type: "removed", prefix: "-", code: "  }" },
    { type: "removed", prefix: "-", code: "  return total;" },
    { type: "added", prefix: "+", code: "  return items.reduce((sum, item) => sum + item.price, 0);" },
    { type: "context", code: "}" },
  ],
};

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "accent-red";
    case "warning":
      return "accent-amber";
    case "good":
      return "accent-green";
    default:
      return "text-text-secondary";
  }
}

function getVerdictColor(verdict: string) {
  if (verdict.includes("serious_help")) return "accent-red";
  if (verdict.includes("improvement")) return "accent-amber";
  return "accent-green";
}

export default function RoastResultPage({ params: _params }: { params: Promise<{ id: string }> }) {
  void _params;

  return (
    <main className="flex flex-col items-center w-full bg-bg-page">
      <div className="w-full max-w-[1440px] flex flex-col gap-10 px-20 pt-10 pb-10">
        <section className="flex gap-12">
          <ScoreRing score={roastData.score} />
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-${getVerdictColor(roastData.verdict)}`} />
              <span className={`font-mono text-sm font-medium text-${getVerdictColor(roastData.verdict)}`}>
                {roastData.verdictLabel}
              </span>
            </div>
            <p className="font-mono text-xl text-foreground leading-relaxed">
              {roastData.title}
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-tertiary">
                lang: {roastData.language}
              </span>
              <span className="font-mono text-xs text-text-tertiary">·</span>
              <span className="font-mono text-xs text-text-tertiary">
                {roastData.lines} lines
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="md" radius="none">
                <span className="font-mono text-xs">$ share_roast</span>
              </Button>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-border-primary" />

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">{"//"}</span>
            <span className="font-mono text-sm font-bold text-foreground">your_submission</span>
          </div>
          <CodeBlock code={roastData.code} language={roastData.language} showHeader={false} className="h-[424px]" />
        </section>

        <div className="h-px w-full bg-border-primary" />

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">{"//"}</span>
            <span className="font-mono text-sm font-bold text-foreground">detailed_analysis</span>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {roastData.issues.map((issue, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-${getSeverityColor(issue.severity)}`} />
                    <CardTitle className={`text-xs font-medium text-${getSeverityColor(issue.severity)}`}>
                      {issue.severity}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardTitle className="text-sm font-medium text-foreground">
                  {issue.title}
                </CardTitle>
                <CardDescription>{issue.description}</CardDescription>
              </Card>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-border-primary" />

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">{"//"}</span>
            <span className="font-mono text-sm font-bold text-foreground">suggested_fix</span>
          </div>
          <div className="border border-border-primary bg-bg-input">
            <div className="flex items-center h-10 px-4 border-b border-border-primary">
              <span className="font-mono text-xs text-text-secondary">
                your_code.ts → improved_code.ts
              </span>
            </div>
            <div className="p-1">
              {roastData.diffLines.map((line, index) => (
                <DiffLine
                  key={index}
                  variant={line.type as "removed" | "added" | "context"}
                  prefix={line.prefix || " "}
                  code={line.code}
                  language={roastData.language}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
