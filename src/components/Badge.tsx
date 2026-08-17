import Image from "next/image";

interface BadgeProps {
  icon: string;
  iconAlt: string;
  label: string;
  variant?: "default" | "green";
}

export default function Badge({ icon, iconAlt, label, variant = "default" }: BadgeProps) {
  const isGreen = variant === "green";
  return (
    <div
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-[var(--r-sm)] border text-[13px] font-medium tracking-[-0.02em] whitespace-nowrap ${
        isGreen
          ? "border-[rgba(144,222,127,0.25)] text-[#90de7f] bg-[#1c2d18]"
          : "border-[rgba(255,255,255,0.1)] text-white bg-[#131313]"
      }`}
      style={{ boxShadow: "inset 0px 2px 12px rgba(255,255,255,0.03)" }}
    >
      <Image src={icon} alt={iconAlt} width={15} height={15} className="shrink-0 opacity-80" />
      <span>{label}</span>
    </div>
  );
}
