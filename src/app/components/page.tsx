import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";
import { Toggle } from "@/components/ui/toggle";

const variants = ["primary", "secondary", "link", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;
const radiuses = ["none", "sm", "md", "lg", "full"] as const;

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Componentes UI</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Página de exemplo com todas as variantes dos componentes</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Button</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Variants</h3>
              <div className="flex flex-wrap gap-4">
                {variants.map((variant) => (
                  <Button key={variant} variant={variant}>
                    {variant}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                {sizes.map((size) => (
                  <Button key={size} size={size}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Border Radius</h3>
              <div className="flex flex-wrap items-center gap-4">
                {radiuses.map((radius) => (
                  <Button key={radius} radius={radius}>
                    {radius}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Estados</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button>Default</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Estados (por variant)</h3>
              <div className="flex flex-wrap gap-4">
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">Primary</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary">Default</Button>
                    <Button variant="primary" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">Secondary</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary">Default</Button>
                    <Button variant="secondary" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">Danger</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="danger">Default</Button>
                    <Button variant="danger" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Combinações (Variant + Size + Radius)</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm" radius="none">
                  Primary SM
                </Button>
                <Button variant="primary" size="md" radius="md">
                  Primary MD
                </Button>
                <Button variant="primary" size="lg" radius="full">
                  Primary LG
                </Button>
                <Button variant="secondary" size="sm" radius="sm">
                  Secondary
                </Button>
                <Button variant="danger" size="md" radius="lg">
                  Danger
                </Button>
                <Button variant="secondary" size="sm" radius="full">
                  Secondary
                </Button>
                <Button variant="link" size="lg" radius="none">
                  Link
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Com ícones</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar
                </Button>
                <Button size="md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar
                </Button>
                <Button size="lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Toggle</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Estados</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Toggle pressed label="roast mode" />
                <Toggle pressed={false} label="roast mode" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Badge</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Variants</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="critical">critical</Badge>
                <Badge variant="warning">warning</Badge>
                <Badge variant="good">good</Badge>
                <Badge variant="verdict">needs_serious_help</Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Card</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Analysis Card</h3>
              <Card>
                <CardHeader>
                  <Badge variant="critical" />
                  <span className="font-mono text-xs text-accent-red">critical</span>
                </CardHeader>
                <CardTitle>using var instead of const/let</CardTitle>
                <CardDescription>
                  the var keyword is function-scoped rather than block-scoped, which can lead to unexpected behavior and bugs. modern javascript uses const for immutable bindings and let for mutable
                  ones.
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Code Block</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Default</h3>
              <CodeBlock.Root>
                <CodeBlock.Header filename="calculate.js" />
                <CodeBlock.Content language="javascript">
                  {`function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`}
                </CodeBlock.Content>
              </CodeBlock.Root>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Diff Line</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Tipos</h3>
              <div className="rounded-lg border border-border-primary overflow-hidden p-2">
                <DiffLine variant="removed" prefix="-" code="var total = 0;" />
                <DiffLine variant="added" prefix="+" code="const total = 0;" />
                <DiffLine variant="context" code={"for (let i = 0; i < items.length; i++) {"} />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Score Ring</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Scores</h3>
              <div className="flex flex-wrap items-center gap-8">
                <ScoreRing score={3.5} />
                <ScoreRing score={7.5} />
                <ScoreRing score={9.2} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
