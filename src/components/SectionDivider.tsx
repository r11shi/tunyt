import React from "react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  label: string;
  className?: string;
  labelClassName?: string;
}

export default function SectionDivider({
  label,
  className,
  labelClassName,
}: SectionDividerProps) {
  return (
    <div className={cn("relative flex items-center justify-center my-6", className)}>
      <div className="flex-1 h-[1px] bg-white/10" />
      <span
        className={cn(
          "px-4 text-[15px] sm:text-[16px] font-medium text-white tracking-[-0.03em] whitespace-nowrap shrink-0",
          labelClassName
        )}
      >
        {label}
      </span>
      <div className="flex-1 h-[1px] bg-white/10" />
    </div>
  );
}
