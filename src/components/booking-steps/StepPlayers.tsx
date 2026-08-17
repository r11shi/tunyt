"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { BookingData } from "../BookingModal";

interface StepPlayersProps {
  bookingData: BookingData;
  onContinue: (data: Partial<BookingData>) => void;
}

import SectionDivider from "../SectionDivider";
import { Calendar } from "lucide-react";

export default function StepPlayers({ bookingData, onContinue }: StepPlayersProps) {
  const [players, setPlayers] = useState(bookingData.players || 1);

  const handleContinue = () => {
    onContinue({ players });
  };

  return (
    <div className="flex flex-col h-full flex-1">
      {/* ── Selected Info Pill ──────────────────────────────── */}
      <div className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.05)] rounded-full py-3 px-4 flex items-center gap-3 mb-6">
        <Calendar className="w-4 h-4 text-[rgba(255,255,255,0.4)]" />
        <span className="text-[14px] font-medium text-white tracking-[-0.01em]">
          {bookingData.date} • {bookingData.slot}
        </span>
      </div>

      <SectionDivider label="Players" />

      <div className="flex-1 flex flex-col py-2">
        <div className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-[32px] p-2 flex items-center justify-between shadow-inner">
          <button
            type="button"
            disabled={players <= 1}
            onClick={() => setPlayers(Math.max(1, players - 1))}
            className="w-[52px] h-[52px] rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-white text-[24px] font-light transition-colors duration-200 active:scale-[0.92] disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-[rgba(255,255,255,0.05)]"
            aria-label="Decrease players"
          >
            −
          </button>
          
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[rgba(255,255,255,0.6)]" />
            <span className="text-white text-[24px] font-medium tracking-[-0.04em] tabular-nums leading-none">
              {players}
            </span>
            <span className="text-[rgba(255,255,255,0.4)] text-[15px] font-medium leading-none">
              player{players > 1 ? 's' : ''}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setPlayers(Math.min(4, players + 1))}
            className="w-[52px] h-[52px] rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-white text-[24px] font-light transition-colors duration-200 active:scale-[0.92]"
            aria-label="Increase players"
          >
            +
          </button>
        </div>
        
        <p className="text-[rgba(255,255,255,0.4)] text-[13px] font-medium tracking-[0.01em] mt-3 ml-2">
          1–4 players allowed
        </p>

        <div className="mt-8 mb-6">
          <SectionDivider label="Price" />
        </div>

        {/* Price Breakdown */}
        <div className="w-full flex flex-col gap-4 text-[14px] font-medium tracking-[-0.01em] px-1">
          <div className="flex items-center justify-between text-[rgba(255,255,255,0.6)]">
            <span>Slot cost</span>
            <span className="text-white">₹{((bookingData.price || 500) * players).toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-[rgba(255,255,255,0.6)]">
            <span>Platform fee</span>
            <span className="text-white">₹38.46</span>
          </div>
          <div className="h-[1px] bg-[rgba(255,255,255,0.08)] my-1" />
          <div className="flex items-center justify-between text-white text-[16px] font-medium tracking-[-0.02em]">
            <span>Total</span>
            <span>₹{(((bookingData.price || 500) * players) + 38.46).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="pt-4 mt-auto">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full bg-white text-black text-[16px] sm:text-[18px] font-medium tracking-[-0.03em] rounded-full py-4 text-center transition-colors duration-200 hover:bg-[#e8e8e8] active:scale-[0.97] shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
        >
          <span>Continue</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
