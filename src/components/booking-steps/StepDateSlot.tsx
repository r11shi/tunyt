"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Types ──────────────────────────────────────────────── */
interface StepDateSlotProps {
  onContinue: (data: {
    duration: number;
    price: number;
    date: string;
    dateFormatted: string;
    slot: string;
  }) => void;
}

/* ── Data Generators ────────────────────────────────────── */
const DATES = [
  { day: "WED", date: "12", month: "Aug", full: "Wednesday, 12 August 2026" },
  { day: "THU", date: "13", month: "Aug", full: "Thursday, 13 August 2026" },
  { day: "FRI", date: "14", month: "Aug", full: "Friday, 14 August 2026" },
  { day: "SAT", date: "15", month: "Aug", full: "Saturday, 15 August 2026" },
  { day: "SUN", date: "16", month: "Aug", full: "Sunday, 16 August 2026" },
  { day: "MON", date: "17", month: "Aug", full: "Monday, 17 August 2026" },
  { day: "TUE", date: "18", month: "Aug", full: "Tuesday, 18 August 2026" },
];

// Generate slots from 6 AM to 10 PM
function generateSlots() {
  const slots = [];
  for (let hour = 6; hour <= 21; hour++) {
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour > 12 ? hour - 12 : hour;
    
    // :00 slot
    slots.push(`${h12}:00 ${ampm}`);
    // :30 slot
    slots.push(`${h12}:30 ${ampm}`);
  }
  slots.push(`10:00 PM`); // Final slot
  return slots;
}
const ALL_SLOTS = generateSlots();

/* ── Labeled divider ────────────────────────────────────── */
function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-white/[0.04]" />
      <span className="text-[13px] font-semibold text-[rgba(255,255,255,0.5)] tracking-[0.02em] uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/[0.04]" />
    </div>
  );
}

/* ── Radio indicator ────────────────────────────────────── */
function Radio({ active }: { active: boolean }) {
  return (
    <div className={cn(
      "w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300",
      active ? "border-black" : "border-[rgba(255,255,255,0.15)]"
    )}>
      <div className={cn(
        "w-2.5 h-2.5 rounded-full bg-black transition-transform duration-300",
        active ? "scale-100" : "scale-0"
      )} />
    </div>
  );
}

/* ── Component ──────────────────────────────────────────── */
export default function StepDateSlot({ onContinue }: StepDateSlotProps) {
  const [dur, setDur] = useState<30 | 60>(30);
  const [dateIdx, setDateIdx] = useState(0);
  const [slotIdx, setSlotIdx] = useState(0);

  const price = dur === 30 ? 500 : 600;
  const activeDate = DATES[dateIdx];
  const selectedSlot = ALL_SLOTS[slotIdx];

  const handleContinue = () => {
    onContinue({
      duration: dur,
      price,
      date: `${activeDate.day} ${activeDate.date} ${activeDate.month}`,
      dateFormatted: activeDate.full,
      slot: selectedSlot,
    });
  };

  return (
    <div className="flex flex-col h-full flex-1">
      {/* ── Duration ──────────────────────────────────── */}
      <Divider label="Duration" />

      <div className="grid grid-cols-2 gap-3 sm:gap-3">
        {/* 30 Mins */}
        <button
          type="button"
          onClick={() => setDur(30)}
          className={cn(
            "flex items-center justify-between px-4 sm:px-5 py-3.5 rounded-[20px] transition-colors duration-200 active:scale-[0.98]",
            dur === 30
              ? "bg-[#f0f0f0] text-black shadow-sm"
              : "bg-[rgba(255,255,255,0.03)] text-white hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.05)]"
          )}
        >
          <span className="text-[17px] font-medium tracking-[-0.03em]">30 Mins</span>
          <div className="flex items-center gap-2.5">
            <span className={cn("text-[15px] font-semibold tracking-[-0.02em]", dur === 30 ? "text-[#333]" : "text-[rgba(255,255,255,0.4)]")}>
              ₹500
            </span>
            <Radio active={dur === 30} />
          </div>
        </button>

        {/* 60 Mins */}
        <button
          type="button"
          onClick={() => setDur(60)}
          className={cn(
            "flex items-center justify-between px-4 sm:px-5 py-3.5 rounded-[20px] transition-colors duration-200 active:scale-[0.98]",
            dur === 60
              ? "bg-[#f0f0f0] text-black shadow-sm"
              : "bg-[rgba(255,255,255,0.03)] text-white hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.05)]"
          )}
        >
          <span className="text-[17px] font-medium tracking-[-0.03em]">60 Mins</span>
          <div className="flex items-center gap-2.5">
            <span className={cn("text-[15px] font-semibold tracking-[-0.02em]", dur === 60 ? "text-[#333]" : "text-[rgba(255,255,255,0.4)]")}>
              ₹600
            </span>
            <Radio active={dur === 60} />
          </div>
        </button>
      </div>

      {/* ── Date cards ────────────────────────────────── */}
      <div className="flex items-center gap-3 py-6 overflow-x-auto scrollbar-none -mx-2 px-2 mask-edges">
        {DATES.map((d, i) => {
          const sel = i === dateIdx;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setDateIdx(i)}
              className={cn(
                "flex flex-col items-center justify-between shrink-0 w-[72px] h-[108px] py-3 rounded-[20px] transition-all duration-200 active:scale-[0.96]",
                sel
                  ? "bg-[#f0f0f0] text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white border border-[rgba(255,255,255,0.05)]"
              )}
            >
              <span className={cn("text-[13px] font-semibold uppercase tracking-[0.04em]", sel ? "text-[#666]" : "")}>
                {d.day}
              </span>
              <span className="text-[34px] font-medium tracking-[-0.06em] leading-none">
                {d.date}
              </span>
              <span className={cn("text-[13px] font-semibold tracking-[0.02em]", sel ? "text-[#666]" : "")}>
                {d.month}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Selected date label ───────────────────────── */}
      <Divider label={activeDate.full} />

      {/* ── Time slots grid ───────────────────────────── */}
      <div className="h-[240px] overflow-y-auto scrollbar-none -mx-2 px-2 pb-6 relative mask-bottom">
        <div className="grid grid-cols-3 gap-3">
          {ALL_SLOTS.map((time, i) => {
            const sel = i === slotIdx;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSlotIdx(i)}
                className={cn(
                  "py-[16px] rounded-[18px] text-center text-[16px] font-medium tracking-[-0.02em] transition-colors duration-200 active:scale-[0.97] border",
                  sel
                    ? "bg-[#f0f0f0] text-black border-[#f0f0f0] shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    : "bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.05)] hover:text-white"
                )}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] mt-auto pb-2">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full bg-white text-black text-[18px] sm:text-[20px] font-semibold tracking-[-0.03em] rounded-full py-5 text-center transition-colors duration-200 hover:bg-[#e8e8e8] active:scale-[0.97] shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
        >
          <span>Continue with {dur} min</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
