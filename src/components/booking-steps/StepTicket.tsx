"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { BookingData } from "../BookingModal";
import { Check } from "lucide-react";

interface StepTicketProps {
  bookingData: BookingData;
  onClose: () => void;
}

export default function StepTicket({ bookingData, onClose }: StepTicketProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti when component mounts
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#90de7f', '#ffffff']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#90de7f', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    setShowConfetti(true);
  }, []);

  return (
    <div className="flex flex-col h-full items-center py-2 sm:py-4">
      <div className="w-12 h-12 rounded-full bg-[#90de7f] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(144,222,127,0.3)]">
        <Check className="w-6 h-6 text-[#1c2d18]" strokeWidth={3} />
      </div>
      
      <h2 className="text-[22px] font-medium tracking-[-0.03em] text-white mb-2 text-center">
        Booking Confirmed!
      </h2>
      <p className="text-[14px] text-[rgba(255,255,255,0.5)] tracking-[-0.01em] mb-6 text-center max-w-[260px] leading-[1.3]">
        Your table has been reserved successfully. Show this ticket at the venue.
      </p>

      {/* ── Ticket Card ───────────────────────────────── */}
      <div className="w-full max-w-[340px] bg-white rounded-[20px] overflow-hidden text-black relative">
        {/* Top Section */}
        <div className="p-5 pb-5 bg-[#f8f8f8]">
          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="text-[11px] uppercase font-medium text-[#666] tracking-[0.05em] mb-0.5">Venue</p>
              <h3 className="text-[18px] font-medium tracking-[-0.02em] leading-tight mb-0.5">Nine Ball Cafe</h3>
              <p className="text-[13px] font-medium text-[#444] tracking-[-0.01em]">Saharanpur, UP</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
              <span className="text-white font-medium text-[16px]">1</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-3">
            <div>
              <p className="text-[10px] uppercase font-medium text-[#888] tracking-[0.05em] mb-0.5">Date</p>
              <p className="text-[14px] font-medium tracking-[-0.02em]">{bookingData.date}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-medium text-[#888] tracking-[0.05em] mb-0.5">Time</p>
              <p className="text-[14px] font-medium tracking-[-0.02em]">{bookingData.slot}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-medium text-[#888] tracking-[0.05em] mb-0.5">Duration</p>
              <p className="text-[14px] font-medium tracking-[-0.02em]">{bookingData.duration} Mins</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-medium text-[#888] tracking-[0.05em] mb-0.5">Players</p>
              <p className="text-[14px] font-medium tracking-[-0.02em]">{bookingData.players}</p>
            </div>
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="relative h-[20px] bg-white w-full flex items-center">
          <div className="absolute left-[-10px] w-[20px] h-[20px] rounded-full bg-[#0d0d0d]" />
          <div className="absolute right-[-10px] w-[20px] h-[20px] rounded-full bg-[#0d0d0d]" />
          <div className="w-full border-t-[2px] border-dashed border-[#ddd] mx-4" />
        </div>

        {/* Bottom Section - Barcode & Price */}
        <div className="p-5 bg-white flex flex-col">
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex justify-between items-center text-[#666] text-[13px] font-medium tracking-[-0.01em]">
              <span>Slot Cost</span>
              <span>₹{((bookingData.price || 500) * (bookingData.players || 1)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[#666] text-[13px] font-medium tracking-[-0.01em]">
              <span>Platform fee</span>
              <span>₹38.46</span>
            </div>
            <div className="h-px bg-[#eee] my-1" />
            <div className="flex justify-between items-center text-black text-[15px] font-medium tracking-[-0.02em]">
              <span>Total Paid</span>
              <span>₹{(((bookingData.price || 500) * (bookingData.players || 1)) + 38.46).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[10px] uppercase font-medium text-[#888] tracking-[0.05em] mb-2">Booking ID: NINE-8X29F</p>
          <svg className="w-full h-[60px]" preserveAspectRatio="none" viewBox="0 0 200 60">
            <rect x="10" y="0" width="4" height="60" fill="black"/>
            <rect x="18" y="0" width="8" height="60" fill="black"/>
            <rect x="30" y="0" width="2" height="60" fill="black"/>
            <rect x="36" y="0" width="6" height="60" fill="black"/>
            <rect x="46" y="0" width="12" height="60" fill="black"/>
            <rect x="62" y="0" width="4" height="60" fill="black"/>
            <rect x="70" y="0" width="2" height="60" fill="black"/>
            <rect x="76" y="0" width="10" height="60" fill="black"/>
            <rect x="90" y="0" width="4" height="60" fill="black"/>
            <rect x="98" y="0" width="6" height="60" fill="black"/>
            <rect x="108" y="0" width="2" height="60" fill="black"/>
            <rect x="114" y="0" width="8" height="60" fill="black"/>
            <rect x="126" y="0" width="4" height="60" fill="black"/>
            <rect x="134" y="0" width="10" height="60" fill="black"/>
            <rect x="148" y="0" width="2" height="60" fill="black"/>
            <rect x="154" y="0" width="8" height="60" fill="black"/>
            <rect x="166" y="0" width="6" height="60" fill="black"/>
            <rect x="176" y="0" width="4" height="60" fill="black"/>
            <rect x="184" y="0" width="6" height="60" fill="black"/>
          </svg>
        </div>
      </div>
      </div>

      <div className="w-full mt-auto pt-4 pb-2">
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-[rgba(255,255,255,0.08)] text-white text-[15px] font-medium tracking-[-0.02em] rounded-full py-3.5 text-center transition-colors duration-200 hover:bg-[rgba(255,255,255,0.12)] active:scale-[0.97]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
