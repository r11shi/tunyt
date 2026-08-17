"use client";

import { useState } from "react";
import { BookingData } from "../BookingModal";

interface StepDetailsProps {
  bookingData: BookingData;
  onContinue: (data: Partial<BookingData>) => void;
}

export default function StepDetails({ bookingData, onContinue }: StepDetailsProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    onContinue({ name, email, phone });
  };

  const isFormValid = name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";

  return (
    <div className="flex flex-col h-full flex-1">
      <div className="flex-1 flex flex-col gap-5 py-2">
        
        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-[rgba(255,255,255,0.5)] tracking-[0.02em] uppercase">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[16px] px-5 py-4 text-white text-[16px] font-medium placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-[rgba(255,255,255,0.5)] tracking-[0.02em] uppercase">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[16px] px-5 py-4 text-white text-[16px] font-medium placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-[rgba(255,255,255,0.5)] tracking-[0.02em] uppercase">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[16px] px-5 py-4 text-white text-[16px] font-medium placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
          />
        </div>

      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] mt-auto pb-2">
        <button
          type="button"
          disabled={!isFormValid}
          onClick={handleContinue}
          className="w-full bg-white text-black text-[18px] sm:text-[20px] font-semibold tracking-[-0.03em] rounded-full py-5 text-center transition-all duration-200 hover:bg-[#e8e8e8] active:scale-[0.97] shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none"
        >
          Review Booking
        </button>
      </div>
    </div>
  );
}
