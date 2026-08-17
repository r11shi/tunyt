"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookingData } from "../BookingModal";
import { cn } from "@/lib/utils";

interface StepPaymentProps {
  bookingData: BookingData;
  onConfirm: () => void;
}

export default function StepPayment({ bookingData, onConfirm }: StepPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"online" | "venue">(bookingData.paymentMethod || "online");
  const [isSplit, setIsSplit] = useState(false);

  const playersCount = bookingData.players || 1;

  const slotCost = bookingData.price || 500;
  const platformFee = 38.46;
  const total = slotCost + platformFee;
  const displayTotal = isSplit && playersCount > 1 ? total / playersCount : total;

  return (
    <div className="flex flex-col h-full flex-1">
      {/* ── Summary Pill ──────────────────────────────── */}
      <div className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.05)] rounded-full py-2.5 px-4 flex items-center justify-center gap-2 mb-8 mt-2">
        <span className="text-[13px] font-medium text-[rgba(255,255,255,0.7)] tracking-[0.02em] uppercase">
          Total
        </span>
        <div className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)]" />
        <span className="text-[14px] font-semibold text-white tracking-[-0.02em]">
          {isSplit && playersCount > 1 ? `₹${displayTotal.toFixed(2)} × ${playersCount}` : `₹${total.toFixed(2)}`}
        </span>
      </div>

      <div className="flex-1 py-2 overflow-y-auto scrollbar-none">
        <h2 className="text-[24px] font-medium tracking-[-0.04em] text-white mb-6">
          Payment Method
        </h2>

        <div className="flex flex-col gap-3" role="radiogroup">
          <button
            type="button"
            role="radio"
            aria-checked={paymentMethod === "online"}
            onClick={() => setPaymentMethod("online")}
            className={cn(
              "flex items-center justify-between p-5 rounded-[24px] transition-colors duration-200 active:scale-[0.98] border",
              paymentMethod === "online"
                ? "bg-[#f0f0f0] text-[#0d0d0d] border-[#f0f0f0]"
                : "bg-[rgba(255,255,255,0.04)] text-white hover:bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.05)]"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[16px] bg-[rgba(0,0,0,0.1)] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-[18px] font-medium tracking-[-0.02em] mb-0.5">Pay Online</span>
                <span className={cn(
                  "block text-[13px] font-medium tracking-[0.01em]",
                  paymentMethod === "online" ? "text-[rgba(0,0,0,0.5)]" : "text-[rgba(255,255,255,0.4)]"
                )}>
                  Credit/Debit, UPI, Wallets
                </span>
              </div>
            </div>
            
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 shrink-0",
              paymentMethod === "online" ? "border-[#0d0d0d]" : "border-[rgba(255,255,255,0.2)]"
            )}>
              {paymentMethod === "online" && <div className="w-3 h-3 rounded-full bg-[#0d0d0d]" />}
            </div>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={paymentMethod === "venue"}
            onClick={() => setPaymentMethod("venue")}
            className={cn(
              "flex items-center justify-between p-5 rounded-[24px] transition-colors duration-200 active:scale-[0.98] border",
              paymentMethod === "venue"
                ? "bg-[#f0f0f0] text-[#0d0d0d] border-[#f0f0f0]"
                : "bg-[rgba(255,255,255,0.04)] text-white hover:bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.05)]"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[16px] bg-[rgba(0,0,0,0.1)] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-[18px] font-medium tracking-[-0.02em] mb-0.5">Pay at Venue</span>
                <span className={cn(
                  "block text-[13px] font-medium tracking-[0.01em]",
                  paymentMethod === "venue" ? "text-[rgba(0,0,0,0.5)]" : "text-[rgba(255,255,255,0.4)]"
                )}>
                  Cash or card at the location
                </span>
              </div>
            </div>

            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 shrink-0",
              paymentMethod === "venue" ? "border-[#0d0d0d]" : "border-[rgba(255,255,255,0.2)]"
            )}>
              {paymentMethod === "venue" && <div className="w-3 h-3 rounded-full bg-[#0d0d0d]" />}
            </div>
          </button>
        </div>

        {/* Split Payment Toggle */}
        {playersCount > 1 && (
          <div className="mt-8">
            <h3 className="text-[18px] font-medium tracking-[-0.03em] text-white mb-4">Split the Bill</h3>
            <div className="flex items-center justify-between bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.05)] rounded-[20px] p-5">
              <div className="text-left">
                <span className="block text-[16px] font-medium text-white mb-0.5">Split with {playersCount - 1} others</span>
                <span className="block text-[13px] text-[rgba(255,255,255,0.4)]">You only pay your share now</span>
              </div>
              
              {/* Custom Toggle */}
              <button 
                type="button" 
                role="switch"
                aria-checked={isSplit}
                onClick={() => setIsSplit(!isSplit)}
                className={cn(
                  "relative w-[48px] h-[28px] rounded-full transition-colors duration-300 shrink-0",
                  isSplit ? "bg-[#90de7f]" : "bg-[rgba(255,255,255,0.2)]"
                )}
              >
                <div className={cn(
                  "absolute top-[2px] left-[2px] w-[24px] h-[24px] bg-white rounded-full transition-transform duration-300 shadow-sm",
                  isSplit ? "translate-x-[20px]" : "translate-x-0"
                )} />
              </button>
            </div>
            
            {/* Split Payment Explanation */}
            {isSplit && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 bg-[rgba(144,222,127,0.1)] border border-[rgba(144,222,127,0.2)] rounded-[16px] p-4 flex items-start gap-3"
              >
                <div className="w-5 h-5 shrink-0 rounded-full bg-[rgba(144,222,127,0.2)] flex items-center justify-center mt-0.5">
                  <span className="text-[#90de7f] text-[12px] font-bold">i</span>
                </div>
                <p className="text-[13px] font-medium text-[rgba(255,255,255,0.7)] leading-[1.4]">
                  You will pay your share of <span className="text-white font-semibold">₹{displayTotal.toFixed(2)}</span> now to secure the booking. A payment link will be sent via SMS/Email to the other {playersCount - 1} {playersCount - 1 === 1 ? "player" : "players"} for their share.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* ── Final CTA ─────────────────────────────────── */}
      <div className="pt-4 mt-auto">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full bg-[#90de7f] text-[#1c2d18] text-[16px] sm:text-[18px] font-bold tracking-[-0.03em] rounded-full py-4 text-center transition-colors duration-200 hover:bg-[#7bc86a] active:scale-[0.97] shadow-[0_4px_20px_0_rgba(144,222,127,0.3)] flex items-center justify-center gap-2"
        >
          <span>Hold & Pay ₹{displayTotal.toFixed(2)}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
