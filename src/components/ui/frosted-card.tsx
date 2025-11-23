import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type FrostedCardProps = {
  children: ReactNode;
  className?: string;
};

function FrostedCardComponent({ children, className }: FrostedCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl border border-white/5 bg-surface-soft p-6 shadow-xl shadow-black/30",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const FrostedCard = memo(FrostedCardComponent);
FrostedCard.displayName = "FrostedCard";
