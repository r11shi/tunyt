import Image from "next/image";
import ActivityTabs from "./ActivityTabs";

interface MetaItemProps {
  icon: string;
  alt: string;
  label: string;
}

function MetaItem({ icon, alt, label }: MetaItemProps) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <Image src={icon} alt={alt} width={14} height={14} className="opacity-70 w-auto h-auto" />
      <span className="text-white/80 text-[14px] font-medium tracking-[-0.02em] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function ActivityCard() {
  return (
    <div className="relative rounded-[var(--r-lg)] border border-[rgba(255,255,255,0.1)] bg-[#131313] overflow-hidden p-5"
      style={{ boxShadow: "inset 0px 2px 16px rgba(255,255,255,0.03)" }}
    >
      {/* ── Card Header ───────────────────────────── */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-[12px] bg-[#2a2a2a] shrink-0 overflow-hidden border border-[rgba(255,255,255,0.05)]">
            <Image src="/assets/pool-ball-icon.png" alt="Pool billiards" fill sizes="40px" className="object-cover" />
          </div>
          <p className="text-[18px] font-semibold tracking-[-0.04em] leading-none">
            <span className="text-white">Pool Billards</span>
            <span className="text-[rgba(255,255,255,0.35)] font-medium ml-1.5">- Table 1</span>
          </p>
        </div>
        <button type="button" className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-100">
          <Image src="/assets/icon-chevron.svg" alt="Collapse" width={14} height={8} className="opacity-60 w-auto h-auto" />
        </button>
      </div>

      {/* ── Meta row ──────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-5 pb-4">
        <MetaItem icon="/assets/icon-timer.svg" alt="Duration" label="30 Min/Slot" />
        <MetaItem icon="/assets/icon-rupee.svg" alt="Price" label="₹ 500/hr" />
        <MetaItem icon="/assets/icon-people.svg" alt="Capacity" label="1-2 People" />
      </div>

      {/* ── Divider ───────────────────────────────── */}
      <div className="border-t border-[rgba(255,255,255,0.08)]" />

      {/* ── Tabs ──────────────────────────────────── */}
      <div className="pt-4 pb-2">
        <ActivityTabs />
      </div>

      {/* ── Description ───────────────────────────── */}
      <p className="pt-2 text-[rgba(255,255,255,0.5)] text-[15px] font-normal leading-relaxed tracking-[-0.02em]">
        Professional-quality pool table with a smooth playing surface, premium
        cues, and comfortable seating—perfect for casual games, practice
        sessions, and friendly competitions.
      </p>
    </div>
  );
}
