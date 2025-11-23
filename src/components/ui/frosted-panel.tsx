import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type FrostedPanelProps = {
  children: ReactNode;
  className?: string;
};

export function FrostedPanel({ children, className }: FrostedPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-surface-soft/80 p-6 text-foreground shadow-xl shadow-black/40 backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
