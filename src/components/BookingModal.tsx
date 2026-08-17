"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import StepDateSlot from "./booking-steps/StepDateSlot";
import StepPlayers from "./booking-steps/StepPlayers";
import StepReview from "./booking-steps/StepReview";
import StepPayment from "./booking-steps/StepPayment";
import StepTicket from "./booking-steps/StepTicket";
import StepDetails from "./booking-steps/StepDetails";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BookingData {
  duration: number;
  price: number;
  date: string;
  dateFormatted: string;
  slot: string;
  players: number;
  discountCode?: string;
  paymentMethod: "online" | "venue";
  playersDetails?: { name: string; email: string; phone: string }[];
}

/* ─── Apple-style ease: fast out, no bounce ─────────────── */
const EASE_OUT = [0.25, 1, 0.5, 1] as const;

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 for forward, -1 for backward
  const [bookingData, setBookingData] = useState<BookingData>({
    duration: 30,
    price: 500,
    date: "Wed 12 Aug",
    dateFormatted: "Wednesday, 12 August 2026",
    slot: "6:00 - 6:30",
    players: 1,
    paymentMethod: "online",
  });
  
  const modalRef = useRef<HTMLDivElement>(null);

  /* Escape to close */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* Focus Trap */
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    
    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) { // shift + tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    // Focus first element on open
    setTimeout(() => {
      if (firstElement) firstElement.focus();
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Reset to step 1 after exit animation completes */
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(1);
        setDirection(1);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const goToStep = useCallback((nextStep: 1 | 2 | 3 | 4 | 5 | 6) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }, [step]);

  const handleStep1Continue = useCallback((data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    goToStep(2);
  }, [goToStep]);

  const handleStep2Continue = useCallback((data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    const newPlayersCount = data.players ?? bookingData.players;
    if (newPlayersCount === 1) {
      goToStep(4); // Skip Details step
    } else {
      goToStep(3);
    }
  }, [bookingData.players, goToStep]);
  
  const handleStep3Continue = useCallback((data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    goToStep(4);
  }, [goToStep]);

  const handleStep4Continue = useCallback((data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    goToStep(5);
  }, [goToStep]);

  const handleStep5Continue = useCallback(() => {
    goToStep(6);
  }, [goToStep]);

  const handleBack = useCallback(() => {
    if (step === 4 && bookingData.players === 1) {
      goToStep(2);
    } else if (step > 1 && step < 6) {
      goToStep((step - 1) as 1 | 2 | 3 | 4 | 5 | 6);
    } else {
      onClose();
    }
  }, [step, bookingData.players, goToStep, onClose]);
  
  const stepVariants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 12 : -12,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2, ease: EASE_OUT as any }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -12 : 12,
      opacity: 0,
      transition: { duration: 0.15, ease: "easeIn" as any }
    })
  };

  const steps = [
    { num: 1, label: "Date & Slot" },
    { num: 2, label: "Players" },
    ...(bookingData.players > 1 ? [{ num: 3, label: "Details" }] : []),
    { num: 4, label: "Review" },
    { num: 5, label: "Payment" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-center items-end" aria-live="polite">
          {/* ── Backdrop ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={step < 6 ? onClose : undefined} // Don't close on backdrop click if ticket is shown
            className="absolute inset-0 bg-black/70"
          />

          {/* ── Modal ────────────────────────────────── */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Book Table 1"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative z-10 w-full sm:w-[calc(100%-24px)] sm:max-w-[560px] h-fit max-h-[90vh] bg-[#0d0d0d] rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-[rgba(255,255,255,0.08)] overflow-hidden flex flex-col"
            style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.5), inset 0px 1px 1px rgba(255,255,255,0.08)" }}
          >
            {/* ── Progress Bar ─────────────────────────── */}
            {step < 6 && (
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[rgba(255,255,255,0.1)] z-30">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((steps.findIndex(s => s.num === step) + 1) / steps.length) * 100}%` 
                  }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              </div>
            )}

            {/* ── Header ─────────────────────────────── */}
            <div className="px-5 pt-7 pb-4 shrink-0 bg-[#0d0d0d] z-20">
              <div className="flex items-center justify-between mb-2">
                {step < 6 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-white transition-colors duration-200 hover:bg-[rgba(255,255,255,0.12)] active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                ) : <div className="w-10 h-10" />}

                <div className="flex items-center gap-2">
                  <span className="text-white text-[18px] font-semibold tracking-[-0.03em] uppercase">
                    TABLE 1
                  </span>
                  <div className="px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.1)] text-[11px] font-bold tracking-[0.06em] uppercase text-white/70">
                    POOL BILLIARDS
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-white transition-colors duration-200 hover:bg-[rgba(255,255,255,0.12)] active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── Stepper Title ──────────────────────── */}
              {step < 6 && (
                <div className="flex items-center justify-center w-full mt-1">
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[14px] font-semibold tracking-[-0.01em] text-[rgba(255,255,255,0.5)]"
                  >
                    Step {steps.findIndex(s => s.num === step) + 1} of {steps.length}: <span className="text-white ml-1">{steps.find(s => s.num === step)?.label}</span>
                  </motion.div>
                </div>
              )}
            </div>

            {/* ── Header Separator line ────────────────── */}
            <div className="h-px bg-[rgba(255,255,255,0.06)] w-full shrink-0" />

            {/* ── Step content ─────────────────────────── */}
            <div className="px-5 pt-5 pb-6 sm:px-7 sm:pb-8 overflow-y-auto scrollbar-none flex flex-col">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                {step === 1 && (
                  <motion.div
                    key="s1"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full flex flex-col"
                  >
                    <StepDateSlot onContinue={handleStep1Continue} />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full flex flex-col"
                  >
                    <StepPlayers bookingData={bookingData} onContinue={handleStep2Continue} />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full flex flex-col"
                  >
                    <StepDetails bookingData={bookingData} onContinue={handleStep3Continue} />
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div
                    key="s4"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full flex flex-col"
                  >
                    <StepReview bookingData={bookingData} onContinue={handleStep4Continue} />
                  </motion.div>
                )}
                {step === 5 && (
                  <motion.div
                    key="s5"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full flex flex-col"
                  >
                    <StepPayment bookingData={bookingData} onConfirm={handleStep5Continue} />
                  </motion.div>
                )}
                {step === 6 && (
                  <motion.div
                    key="s6"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full flex flex-col"
                  >
                    <StepTicket bookingData={bookingData} onClose={onClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
