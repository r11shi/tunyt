import { useState } from "react";
import Image from "next/image";
import { Clock, IndianRupee, Users, Star } from "lucide-react";
import ActivityTabs from "./ActivityTabs";
import AmenityBadge from "./AmenityBadge";

interface MetaItemProps {
  icon: React.ReactNode;
  label: string;
}

function MetaItem({ icon, label }: MetaItemProps) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <div className="text-white/70">
        {icon}
      </div>
      <span className="text-white/80 text-[14px] font-medium tracking-[-0.02em] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function ActivityCard() {
  const [activeTab, setActiveTab] = useState<"About" | "Amenities" | "Rules" | "Reviews">("About");

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
      </div>

      {/* ── Meta row ──────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-5 pb-4">
        <MetaItem icon={<Clock className="w-4 h-4" strokeWidth={2.5} />} label="30 Min/Slot" />
        <MetaItem icon={<IndianRupee className="w-4 h-4" strokeWidth={2.5} />} label="500/hr" />
        <MetaItem icon={<Users className="w-4 h-4" strokeWidth={2.5} />} label="1-2 People" />
      </div>

      {/* ── Divider ───────────────────────────────── */}
      <div className="border-t border-[rgba(255,255,255,0.08)]" />

      {/* ── Tabs ──────────────────────────────────── */}
      <div className="pt-4 pb-2">
        <ActivityTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as any)} />
      </div>

      {/* ── Dynamic Content ───────────────────────────── */}
      <div className="min-h-[120px] pt-2">
        {activeTab === "About" && (
          <p className="text-[rgba(255,255,255,0.5)] text-[15px] font-normal leading-relaxed tracking-[-0.02em] animate-in fade-in duration-300">
            Professional-quality pool table with a smooth playing surface, premium
            cues, and comfortable seating—perfect for casual games, practice
            sessions, and friendly competitions.
          </p>
        )}

        {activeTab === "Amenities" && (
          <div className="animate-in fade-in duration-300 pb-2">
            <p className="text-white text-[16px] font-semibold tracking-[-0.03em] mb-3">Amenities</p>
            <div className="flex flex-wrap gap-2">
              <AmenityBadge>Air Conditioned</AmenityBadge>
              <AmenityBadge>Cafeteria</AmenityBadge>
              <AmenityBadge>Lounge</AmenityBadge>
              <AmenityBadge>Wi-Fi</AmenityBadge>
            </div>
          </div>
        )}

        {activeTab === "Rules" && (
          <ul className="list-disc pl-4 space-y-1.5 text-[rgba(255,255,255,0.5)] text-[14px] animate-in fade-in duration-300">
            <li>No outside food or drinks allowed.</li>
            <li>Please wear proper footwear.</li>
            <li>Maintain table etiquette (no sitting on edges).</li>
            <li>Report damaged cues immediately.</li>
          </ul>
        )}

        {activeTab === "Reviews" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
              <span className="text-white font-bold text-[18px]">4.8</span>
              <span className="text-[rgba(255,255,255,0.4)] text-[14px]">(124 Reviews)</span>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] rounded-[12px] p-3 border border-[rgba(255,255,255,0.05)]">
              <p className="text-white text-[14px] font-medium mb-1">"Best pool tables in town!"</p>
              <p className="text-[rgba(255,255,255,0.4)] text-[12px]">Alex J. • 2 days ago</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
