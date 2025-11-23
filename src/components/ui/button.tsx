"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:cursor-not-allowed disabled:opacity-60 hover:-translate-y-0.5 active:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-white to-white/85 text-[#0c111f] shadow-[0_10px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_14px_28px_rgba(82,124,242,0.25)] dark:from-white/95 dark:to-white/80",
        secondary:
          "border border-white/35 bg-white/5 text-foreground backdrop-blur-lg hover:border-white/70 hover:bg-white/15 dark:border-white/25 dark:text-white/85 dark:hover:text-white",
        ghost: "text-muted hover:text-foreground",
        placeholder:
          "border border-white/10 bg-surface-soft/60 text-muted backdrop-blur-md",
      },
      size: {
        default: "h-12 px-6 text-sm",
        sm: "h-10 px-4 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
