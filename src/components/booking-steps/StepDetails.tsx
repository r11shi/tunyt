"use client";

import { useState } from "react";
import { BookingData } from "../BookingModal";

interface StepDetailsProps {
  bookingData: BookingData;
  onContinue: (data: Partial<BookingData>) => void;
}

export default function StepDetails({ bookingData, onContinue }: StepDetailsProps) {
  const extraPlayersCount = Math.max(1, (bookingData.players || 1) - 1);
  
  const [details, setDetails] = useState(
    Array.from({ length: extraPlayersCount }).map(() => ({ name: "", email: "", phone: "" }))
  );

  const updateDetail = (index: number, field: "name" | "email" | "phone", value: string) => {
    const newDetails = [...details];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setDetails(newDetails);
  };

  const handleContinue = () => {
    onContinue({ playersDetails: details });
  };

  const isFormValid = details.every(d => d.name.trim() !== "" && d.email.trim() !== "" && d.phone.trim() !== "");

  return (
    <div className="flex flex-col h-full flex-1">
      <div className="flex-1 flex flex-col gap-6 py-2">
        {details.map((player, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h3 className="text-white text-[16px] font-medium tracking-[-0.02em]">
              Player {index + 2} Details
            </h3>
            
            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[rgba(255,255,255,0.5)] tracking-[0.02em] uppercase">
                Full Name
              </label>
              <input
                type="text"
                value={player.name}
                onChange={(e) => updateDetail(index, "name", e.target.value)}
                placeholder="John Doe"
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[14px] px-4 py-3 text-white text-[15px] font-medium placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[rgba(255,255,255,0.5)] tracking-[0.02em] uppercase">
                Email Address
              </label>
              <input
                type="email"
                value={player.email}
                onChange={(e) => updateDetail(index, "email", e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[14px] px-4 py-3 text-white text-[15px] font-medium placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
              />
            </div>

            {/* Phone Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[rgba(255,255,255,0.5)] tracking-[0.02em] uppercase">
                Phone Number
              </label>
              <input
                type="tel"
                value={player.phone}
                onChange={(e) => updateDetail(index, "phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[14px] px-4 py-3 text-white text-[15px] font-medium placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
              />
            </div>

            {index < details.length - 1 && (
              <div className="h-px w-full bg-[rgba(255,255,255,0.06)] my-2" />
            )}
          </div>
        ))}
      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] mt-auto pb-2 shrink-0 bg-[#0d0d0d] sticky bottom-0 z-10">
        <button
          type="button"
          disabled={!isFormValid}
          onClick={handleContinue}
          className="w-full bg-white text-black text-[16px] sm:text-[18px] font-medium tracking-[-0.03em] rounded-full py-4 text-center transition-all duration-200 hover:bg-[#e8e8e8] active:scale-[0.97] shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none"
        >
          <span>Review Booking</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
