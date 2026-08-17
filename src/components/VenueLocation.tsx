import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function VenueLocation() {
  return (
    <div className="relative flex items-center gap-4 rounded-[var(--r-lg)] border border-[rgba(255,255,255,0.1)] bg-[#131313] p-4 overflow-hidden cursor-pointer group transition-colors duration-100 hover:bg-[#1a1a1a] active:scale-[0.99]"
      style={{ boxShadow: "inset 0px 2px 16px rgba(255,255,255,0.03)" }}
    >
      <div className="relative w-[88px] h-[66px] rounded-[var(--r-sm)] overflow-hidden shrink-0 border border-[rgba(255,255,255,0.08)]">
        <Image src="/assets/venue-map.png" alt="Map of Saharanpur location" fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <p className="text-white text-[18px] font-semibold tracking-[-0.04em] leading-tight">
          Saharanpur
        </p>
        <p className="text-[rgba(255,255,255,0.35)] text-[14px] font-medium tracking-[-0.02em] leading-snug mt-1 line-clamp-2">
          Awesome Tower, 2C/1394, Roadways Workshop Rd, Gill Colony, Saharanpur..
        </p>
      </div>

      <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] group-hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-100">
        <ChevronRight className="w-4 h-4 text-white/60" />
      </div>
    </div>
  );
}
