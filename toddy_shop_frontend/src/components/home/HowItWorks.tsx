const STEPS = [
  {
    number: "01",
    title: "Locate",
    description: "Find verified shops near your current location, curated for quality.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Check Menu",
    description: "See today's fresh catch and signature dishes before you go.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Verified Taste",
    description: "Community reviews and hygiene ratings you can trust.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Enjoy",
    description: "Experience authentic Kerala heritage flavors, every single time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <path d="M17 8l2-2m-2 0l2 2" strokeWidth="1.4" opacity="0.7" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 px-6 md:px-10 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#1a3a2a]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(45,90,66,0.5) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(35,74,54,0.6) 0%, transparent 50%)",
        }}
      />
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px 256px" }}
      />
      {/* Decorative circle */}
      <div className="absolute -top-[60px] -right-[60px] w-[300px] h-[300px] border border-[rgba(201,168,76,0.15)] rounded-full opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="hiw-header-fade text-center mb-20 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
          <span className="text-[11px] font-medium tracking-[4px] uppercase text-[#c9a84c]">
            Your Journey
          </span>
          <span className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-[clamp(36px,5vw,56px)] font-semibold text-[#f0e8d8] leading-[1.15] tracking-[-0.5px]">
          How It <em className="italic text-[#c9a84c]">Works</em>
        </h2>
      </div>

      {/* Steps grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-[1100px] w-full z-10">
        {/* Connecting line — desktop only */}
        <div
          className="hidden md:block absolute top-[72px] h-[2px] z-0"
          style={{ left: "calc(12.5% + 32px)", right: "calc(12.5% + 32px)" }}
        >
          {/* Background track */}
          <div className="absolute inset-0 bg-[rgba(201,168,76,0.15)] rounded-[1px]" />
          {/* Animated fill */}
          <div
            className="absolute top-0 left-0 bottom-0 rounded-[1px] hiw-line-draw"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #dbc06a, #c9a84c)",
              boxShadow: "0 0 12px rgba(201,168,76,0.3)",
            }}
          />
          {/* Dashed overlay */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent, transparent 8px, #1a3a2a 8px, #1a3a2a 14px)",
            }}
          />
        </div>

        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="group flex flex-col items-center text-center px-5 relative z-[1] hiw-fade-up"
            style={{ animationDelay: `${0.4 + i * 0.3}s` }}
          >
            {/* Step number */}
            <span className="font-[family-name:var(--font-heading)] text-[13px] font-bold text-[#c9a84c] tracking-[2px] mb-[18px] opacity-70">
              {step.number}
            </span>

            {/* Icon wrapper */}
            <div className="relative w-20 h-20 mb-7">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-[1.5px] border-[#c9a84c] opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 group-hover:border-[#dbc06a] group-hover:shadow-[0_0_30px_rgba(201,168,76,0.15)]" />
              {/* Inner circle */}
              <div className="absolute inset-2 rounded-full border-[1.5px] border-[#c9a84c] flex items-center justify-center transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.2)] bg-gradient-to-br from-[#2d5a42] to-[#234a36] group-hover:from-[#c9a84c] group-hover:to-[#dbc06a] group-hover:shadow-[0_4px_30px_rgba(201,168,76,0.3)]">
                <span className="text-[#c9a84c] transition-all duration-300 group-hover:text-[#1a3a2a] group-hover:scale-110">
                  {step.icon}
                </span>
              </div>
              {/* Pulse dot */}
              <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c9a84c] opacity-0 group-hover:opacity-100 group-hover:hiw-pulse-dot" />
            </div>

            <h3 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold text-[#f0e8d8] mb-[10px] tracking-[0.3px] transition-colors duration-300 group-hover:text-[#dbc06a]">
              {step.title}
            </h3>
            <p className="text-sm font-light text-[rgba(240,232,216,0.5)] leading-relaxed max-w-[200px] transition-colors duration-300 group-hover:text-[rgba(240,232,216,0.7)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom accent */}
      <div className="hiw-bottom-fade flex items-center gap-3 mt-[70px] z-10">
        <div className="w-[60px] h-[1px] bg-gradient-to-r from-transparent to-[rgba(201,168,76,0.15)]" />
        <div className="w-[6px] h-[6px] bg-[#c9a84c] rotate-45 opacity-50" />
        <div className="w-[60px] h-[1px] bg-gradient-to-l from-transparent to-[rgba(201,168,76,0.15)]" />
      </div>
    </section>
  );
}
