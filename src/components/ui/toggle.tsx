"use client";

import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import type { ComponentProps, ReactElement } from "react";
import { cn, tv, type VariantProps } from "@/lib/utils";

const toggleVariants = tv({
  base: ["inline-flex items-center gap-3", "cursor-pointer"],
  variants: {
    size: {
      sm: ["text-xs"],
      md: ["text-sm"],
      lg: ["text-base"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

type ToggleProps = ComponentProps<typeof BaseToggle> &
  ToggleVariants & {
    label?: string;
    className?: string;
  };

function Toggle({ size, label, className, ...props }: ToggleProps) {
  return (
    <BaseToggle
      className={toggleVariants({ size, className })}
      {...props}
      render={(
        toggleProps: ComponentProps<"button">,
        state: { pressed: boolean },
      ): ReactElement => {
        const pressed = state.pressed;
        return (
          <button {...toggleProps} type="button">
            <span
              className={cn(
                "relative inline-flex h-5.5 w-10 items-center rounded-full p-0.75 transition-colors",
                pressed ? "bg-accent-green" : "bg-border-primary",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full transition-transform",
                  pressed
                    ? "translate-x-5 bg-black"
                    : "translate-x-0 bg-zinc-400",
                )}
              />
            </span>
            {label && <span className="font-mono">{label}</span>}
          </button>
        );
      }}
    />
  );
}

export { Toggle, type ToggleProps, type ToggleVariants, toggleVariants };
