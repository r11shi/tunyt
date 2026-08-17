"use client";

interface BookingBarProps {
  onBookClick?: () => void;
}

export default function BookingBar({ onBookClick }: BookingBarProps) {
  return (
    <div className="relative flex items-center justify-between rounded-full border border-[rgba(255,255,255,0.12)] bg-[#131313] p-3 pl-6 sm:p-4 sm:pl-8 overflow-hidden"
      style={{ boxShadow: "inset 0px 2px 20px rgba(255,255,255,0.03)" }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[rgba(255,255,255,0.4)] text-[13px] font-medium tracking-[0.08em] uppercase">
          Only at
        </span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-white text-[28px] sm:text-[34px] font-bold tracking-[-0.06em] leading-none">
            ₹500
          </span>
          <span className="text-[rgba(255,255,255,0.5)] text-[16px] font-medium tracking-[-0.03em]">
            /hr
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onBookClick}
        className="bg-white text-black text-[18px] sm:text-[20px] font-semibold tracking-[-0.04em] px-6 py-3 sm:px-8 sm:py-3.5 rounded-full transition-colors duration-100 hover:bg-[#e8e8e8] active:scale-[0.96]"
      >
        Book Now
      </button>
    </div>
  );
}
