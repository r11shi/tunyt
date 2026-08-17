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
            disabled={players <= 1}
            onClick={() => setPlayers(Math.max(1, players - 1))}
            className="w-14 h-14 rounded-[24px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] flex items-center justify-center text-white text-[32px] font-light transition-colors duration-200 active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-[rgba(255,255,255,0.08)]"
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
        <div className="flex flex-col items-center mt-6">
          <p className="text-[rgba(255,255,255,0.4)] text-[14px] font-medium tracking-[-0.02em] text-center mb-3">
            {players === 1 ? "1 player selected for this table." : `You are adding ${players - 1} extra ${players - 1 === 1 ? 'player' : 'players'}.`}
          </p>
          {/* Price Breakdown */}
          {/* Price Breakdown */}
          <div className="w-full mt-4 flex flex-col gap-3.5 text-[15px] font-medium tracking-[-0.02em] px-2">
            <div className="flex items-center justify-between text-[rgba(255,255,255,0.7)]">
              <span>Slot Cost</span>
              <span className="text-white">₹{((bookingData.price || 500) * players).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[rgba(255,255,255,0.7)]">
              <span>Platform fee</span>
              <span className="text-white">₹38.46</span>
            </div>
            <div className="h-px bg-[rgba(255,255,255,0.08)] my-1" />
            <div className="flex items-center justify-between text-white text-[18px] font-semibold tracking-[-0.03em]">
              <span>Total</span>
              <span>₹{(((bookingData.price || 500) * players) + 38.46).toFixed(2)}</span>
            </div>
          </div>
        </div>
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
