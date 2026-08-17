import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  label: string;
  className?: string;
}

export default function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={cn("flex items-center gap-4 my-4", className)}>
      <div 
        className="flex-1 h-[1px]" 
        style={{ background: "linear-gradient(90deg, rgba(0, 0, 0, 0.50) 0%, rgba(255, 255, 255, 0.50) 48.08%, rgba(0, 0, 0, 0.50) 100%)" }}
      />
      <span className="text-[12px] font-medium text-[rgba(255,255,255,0.4)] tracking-[0.02em] uppercase">
        {label}
      </span>
      <div 
        className="flex-1 h-[1px]" 
        style={{ background: "linear-gradient(90deg, rgba(0, 0, 0, 0.50) 0%, rgba(255, 255, 255, 0.50) 48.08%, rgba(0, 0, 0, 0.50) 100%)" }}
      />
    </div>
  );
}
