// src/components/landing/Proof.tsx

const clients: { name: string; icon: React.ReactNode }[] = [
  {
    name: "Aroma Cafe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px] shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    name: "Madras Threads",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px] shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    name: "Lotus Clinic",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px] shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    name: "Pixelforge",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px] shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    name: "Stillpoint",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px] shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    name: "Marina Estates",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px] shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
];

// Duplicate enough times so the scroll never shows a gap
const track = [...clients, ...clients, ...clients];

const Proof = () => (
  <section id="proof" className="py-11 bg-white border-b border-line overflow-hidden">
    <div className="container">
      <p className="text-center font-body text-[11px] tracking-[0.2em] uppercase text-mute/70 mb-7">
        Trusted by growing businesses across TamilNadu
      </p>
    </div>

    {/* Full-width scrolling track — no container clip */}
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div className="flex items-center animate-marquee whitespace-nowrap w-max">
        {track.map((c, i) => (
          <div key={i} className="flex items-center shrink-0">
            {/* Client item */}
            <div className="flex items-center gap-2 px-6 text-ink/30 hover:text-ink/60 transition-colors duration-300 cursor-default select-none">
              {c.icon}
              <span className="font-heading font-semibold text-[14px] tracking-[0.04em]">
                {c.name}
              </span>
            </div>
            {/* Dot separator */}
            <span className="h-1 w-1 rounded-full bg-ink/20 shrink-0" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Proof;