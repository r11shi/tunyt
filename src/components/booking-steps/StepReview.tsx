"use client";

import { useState } from "react";
import Image from "next/image";
import { BookingData } from "../BookingModal";
import { cn } from "@/lib/utils";

interface StepReviewProps {
  bookingData: BookingData;
  onContinue: (data: Partial<BookingData>) => void;
}

export default function StepReview({ bookingData, onContinue }: StepReviewProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const playersCount = bookingData.players || 1;
  const slotCost = (bookingData.price || 500) * playersCount;
  const platformFee = 38.46;
  const total = slotCost + platformFee;

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
      // Logic for discount application goes here
    }
  };

  const handleContinue = () => {
    onContinue({ discountCode: discountApplied ? discountCode : undefined });
  };

  return (
    <div className="flex flex-col h-full flex-1">
      {/* ── Booking Summary Card ──────────────────────── */}
      <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[24px] overflow-hidden mt-2 mb-6">
        <div className="relative w-full h-[120px] bg-[#1a1a1a]">
          {/* We use a placeholder div or Image here. Assuming we can use a generic gradient if no image */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c2d18] to-black opacity-80" />
        </div>
        <div className="p-5 relative">
          <div className="absolute top-0 right-5 -translate-y-1/2 w-12 h-12 rounded-full bg-[#131313] border-4 border-[#0d0d0d] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[#333] flex items-center justify-center">
              <span className="text-white text-[18px] font-bold">9</span>
            </div>
          </div>
          
          <h3 className="text-[20px] font-semibold text-white tracking-[-0.04em] mb-1">
            Nine Ball Cafe
          </h3>
          <p className="text-[14px] text-[rgba(255,255,255,0.5)] tracking-[-0.02em] mb-4">
            Saharanpur, UP
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.05em] font-semibold mb-1">Date</p>
              <p className="text-[14px] text-white font-medium tracking-[-0.02em]">{bookingData.date}</p>
            </div>
            <div>
              <p className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.05em] font-semibold mb-1">Time</p>
              <p className="text-[14px] text-white font-medium tracking-[-0.02em]">{bookingData.slot}</p>
            </div>
            <div>
              <p className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.05em] font-semibold mb-1">Duration</p>
              <p className="text-[14px] text-white font-medium tracking-[-0.02em]">{bookingData.duration} Mins</p>
            </div>
            <div>
              <p className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.05em] font-semibold mb-1">Players</p>
              <p className="text-[14px] text-white font-medium tracking-[-0.02em]">{bookingData.players} {bookingData.players === 1 ? 'Player' : 'Players'}</p>
            </div>
          </div>
          
          {bookingData.playersDetails && bookingData.playersDetails.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.05em] font-semibold mb-2">Player Details</p>
              <div className="flex flex-wrap gap-2">
                {bookingData.playersDetails.map((player, idx) => (
                  <div key={idx} className="bg-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-[10px] text-[13px] text-[rgba(255,255,255,0.8)] font-medium">
                    {player.name || `Player ${idx + 1}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Discount Code ─────────────────────────────── */}
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
        <span className="text-[12px] font-semibold text-[rgba(255,255,255,0.5)] tracking-[0.05em] uppercase">
          Discount Code
        </span>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          disabled={discountApplied}
          className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[16px] px-4 py-3.5 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors duration-200"
        />
        <button
          type="button"
          onClick={handleApplyDiscount}
          disabled={!discountCode.trim() || discountApplied}
          className="bg-[rgba(255,255,255,0.1)] text-white font-medium text-[15px] tracking-[-0.02em] px-5 py-3.5 rounded-[16px] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {discountApplied ? "Applied" : "Apply"}
        </button>
      </div>

      {/* ── Price Breakdown ───────────────────────────── */}
      <div className="flex flex-col gap-3.5 text-[15px] font-medium tracking-[-0.02em] px-2">
        <div className="flex items-center justify-between text-[rgba(255,255,255,0.7)]">
          <span>Slot Cost</span>
          <span className="text-white">₹{slotCost.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-[rgba(255,255,255,0.7)]">
          <span>Platform fee</span>
          <span className="text-white">₹{platformFee.toFixed(2)}</span>
        </div>
        <div className="h-px bg-[rgba(255,255,255,0.08)] my-1" />
        <div className="flex items-center justify-between text-white text-[18px] font-semibold tracking-[-0.03em]">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="pt-8 mt-auto">
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
