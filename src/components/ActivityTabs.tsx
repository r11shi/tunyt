"use client";

import { useState } from "react";

const TABS = ["About", "Amenities", "Rules", "Reviews"] as const;
type Tab = (typeof TABS)[number];

export default function ActivityTabs({ activeTab: controlledTab, onTabChange }: { activeTab?: Tab; onTabChange?: (tab: Tab) => void }) {
  const [internalTab, setInternalTab] = useState<Tab>("About");
  const active = controlledTab ?? internalTab;

  return (
    <div className="flex items-center gap-1.5">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => { setInternalTab(tab); onTabChange?.(tab); }}
          className={`px-3.5 py-2 rounded-[var(--r-xs)] text-[15px] font-medium tracking-[-0.03em] transition-colors duration-100 ${
            active === tab
              ? "bg-[rgba(255,255,255,0.1)] text-white"
              : "text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.05)]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
