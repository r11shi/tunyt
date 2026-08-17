import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AmenityBadgeProps {
  children: ReactNode;
  className?: string;
}

export default function AmenityBadge({ children, className }: AmenityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-[8px] text-[12px] font-semibold tracking-[0.02em] uppercase bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.05)]",
        className
      )}
    >
      {children}
    </span>
  );
}
