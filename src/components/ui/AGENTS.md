# UI Components Standards

## File Structure

```
src/components/ui/
├── button.tsx
└── AGENTS.md
```

## Component Creation Pattern

### 1. Define Variants with tv()

```tsx
import { tv, type VariantProps } from "@/lib/utils";

const buttonVariants = tv({
  base: [...],
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: { ... },
});
```

### 2. Types

```tsx
type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentProps<"button"> &
  ButtonVariants & {
    className?: string;
  };
```

### 3. Component

```tsx
function Component({ variant, size, className, ...props }: ButtonProps) {
  return (
    <element
      className={componentVariants({ variant, size, className })}
      {...props}
    />
  );
}
```

### 4. Exports

```tsx
export { Component, componentVariants, type ComponentProps, type ComponentVariants };
```

## Using Slots (for components with multiple elements)

**Always use slots when a component has multiple child elements.** This keeps all styling within tv() and avoids external conditionals.

Example with Badge:

```tsx
const badgeVariants = tv({
  slots: {
    root: ["inline-flex items-center gap-2", "font-mono"],
    dot: ["rounded-full", "flex-shrink-0"],
  },
  variants: {
    variant: {
      critical: {
        root: "text-accent-red",
        dot: "bg-accent-red",
      },
      warning: {
        root: "text-accent-amber",
        dot: "bg-accent-amber",
      },
      // ...
    },
    size: {
      sm: {
        root: "text-xs",
        dot: "h-1.5 w-1.5",
      },
      md: {
        root: "text-sm",
        dot: "h-2 w-2",
      },
      // ...
    },
  },
  defaultVariants: {
    variant: "critical",
    size: "md",
  },
});

function Badge({ variant, size, className, children, ...props }: BadgeProps) {
  const { root, dot } = badgeVariants({ variant, size });

  return (
    <span className={root({ className })} {...props}>
      <span className={dot()} />
      {children}
    </span>
  );
}
```

## Conditional Classes

Use **cn()** (twMerge + clsx) for conditional classes instead of template literals or arrays with `.join()`:

```tsx
// Bad
className={`base-class ${condition ? "conditional-class" : ""}`}
className={["base-class", condition && "conditional-class"].join(" ")}

// Good
import { cn } from "@/lib/utils";
className={cn("base-class", condition && "conditional-class")}
```

Example from Toggle component:

```tsx
import { cn } from "@/lib/utils";

<span
  className={cn(
    "relative inline-flex h-5.5 w-10 items-center rounded-full p-0.75 transition-colors",
    pressed ? "bg-accent-green" : "bg-border-primary"
  )}
>
  <span
    className={cn(
      "inline-block h-4 w-4 transform rounded-full transition-transform",
      pressed ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-400"
    )}
  />
</span>
```

## Important Rules

- **Named exports only** - never use default exports
- **Do not use cn() with tv()** - pass className directly to tv props
- **Use cn() for conditional classes** - never use template literals or .join()
- **Use ComponentProps<"element">** to extend native props
- **Export component, variants, and types** for external usage
- **Organize classes in arrays** within base/variants for better readability
- **Use canonical class names** - prefer `text-white` over `text-(--color-white)`, `bg-black` over `bg-(--color-black)`, etc.

## Scrollbar Styling

Para elementos com scroll (overflow-auto, overflow-y-auto, etc.), use o estilo inline para personalizar a cor da scrollbar:

```tsx
//元素 com scroll
style={{
  scrollbarColor: '#10b981 transparent',
}}
```

Isso usa a cor accent-green (`#10b981`) para o thumb da scrollbar com fundo transparente.
