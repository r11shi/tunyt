export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 sm:px-10 py-5 sm:py-7 max-w-[1440px] mx-auto w-full">
      <span className="text-white text-[22px] font-black tracking-[-0.06em] uppercase">
        TUNYT
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="hidden sm:block border border-[rgba(255,255,255,0.12)] rounded-[var(--r-sm)] px-5 py-2.5 text-white/80 text-[14px] font-semibold tracking-[-0.03em] transition-colors duration-100 hover:text-white hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.97]"
        >
          Host Your Event
        </button>
        <button
          type="button"
          className="bg-white rounded-[var(--r-sm)] px-5 py-2.5 text-black text-[14px] font-bold tracking-[-0.03em] transition-colors duration-100 hover:bg-[#e8e8e8] active:scale-[0.97]"
        >
          Login
        </button>
      </div>
    </header>
  );
}
