"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { BookingData } from "../BookingModal";

interface StepPlayersProps {
  bookingData: BookingData;
  onContinue: (data: Partial<BookingData>) => void;
}

export default function StepPlayers({ bookingData, onContinue }: StepPlayersProps) {
  const [players, setPlayers] = useState(bookingData.players || 1);

  const handleContinue = () => {
    onContinue({ players });
  };

  return (
    <div className="flex flex-col h-full flex-1">
      {/* ── Summary Pill ──────────────────────────────── */}
      <div className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.05)] rounded-full py-2.5 px-4 flex items-center justify-center gap-2 mb-8 mt-2">
        <span className="text-[13px] font-medium text-[rgba(255,255,255,0.7)] tracking-[0.02em] uppercase">
          Selected
        </span>
        <div className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)]" />
        <span className="text-[14px] font-semibold text-white tracking-[-0.02em]">
          {bookingData.duration} min • {bookingData.slot}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <h2 className="text-[24px] font-medium tracking-[-0.04em] text-white mb-8">
          How many players?
        </h2>

        <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.05)] rounded-[32px] p-2 flex items-center gap-6 shadow-inner">
          <button
            type="button"
            onClick={() => setPlayers(Math.max(1, players - 1))}
            className="w-14 h-14 rounded-[24px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] flex items-center justify-center text-white text-[32px] font-light transition-colors duration-200 active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            aria-label="Decrease players"
          >
            −
          </button>
          <div className="w-[80px] flex items-center justify-center gap-2">
            <span className="text-white text-[40px] font-medium tracking-[-0.06em] tabular-nums">
              {players}
            </span>
            <User className="w-6 h-6 text-white/50 stroke-[2px]" />
          </div>
          <button
            type="button"
            onClick={() => setPlayers(Math.min(4, players + 1))}
            className="w-14 h-14 rounded-[24px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] flex items-center justify-center text-white text-[32px] font-light transition-colors duration-200 active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            aria-label="Increase players"
          >
            +
          </button>
        </div>
        <p className="text-[rgba(255,255,255,0.4)] text-[14px] font-medium tracking-[-0.02em] mt-6 text-center">
          {players === 1 ? "1 player allowed per table." : `You are adding ${players - 1} extra ${players - 1 === 1 ? 'player' : 'players'}.`}
        </p>
      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="pt-4 mt-auto">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full bg-white text-black text-[18px] sm:text-[20px] font-semibold tracking-[-0.03em] rounded-full py-5 text-center transition-colors duration-200 hover:bg-[#e8e8e8] active:scale-[0.97] shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
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
