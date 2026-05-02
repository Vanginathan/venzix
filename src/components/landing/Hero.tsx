/**
 * Hero — Editorial centered headline on a soft mosaic background.
 * Foreground: headline, badge, CTAs. Below: stats row.
 */

const stats = [
  { num: "60+", label: "Websites delivered" },
  { num: "3–7d", label: "Average launch time" },
  { num: "5+", label: "Years building for SMBs" },
  { num: "98%", label: "Client satisfaction" },
];

const Hero = () => (
  <section id="hero" className="relative w-full bg-white rounded-[28px] overflow-hidden">
    {/* Background checkerboard mosaic — soft alternating tiles */}
    <div
      aria-hidden
      className="absolute inset-0 z-0 pointer-events-none grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, 80px)",
        gridAutoRows: "80px",
      }}
    >
      {Array.from({ length: 240 }).map((_, i) => {
        // Organic shade variation across a checkerboard base.
        const palette = ["#FFFFFF", "#EFEFEF", "#F5F5F5", "#EBEBEB"];
        const base = (i + Math.floor(i / 18)) % 2 === 0 ? 0 : 1;
        const jitter = (i * 7) % 11 < 3 ? 2 : (i * 13) % 17 < 2 ? 3 : base;
        return (
          <div
            key={i}
            style={{ backgroundColor: palette[jitter] }}
          />
        );
      })}
    </div>

    {/* Soft white scrim for legibility */}
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white/60 pointer-events-none"
    />

    {/* Foreground content */}
    <div className="relative z-10 px-6 pt-32 md:pt-40 pb-12 md:pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-[13px] text-mute font-body">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse-dot" />
          only 4 slots available
        </span>

        <h1 className="font-heading font-bold mt-4 text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink">
          Web development that<br />grows your business
        </h1>

        <p className="mt-5 text-sm md:text-base text-mute font-body max-w-xl mx-auto">
          Custom websites and web apps — designed, developed and launched in days, not months.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 justify-center rounded-pill bg-ink text-white px-6 h-11 font-heading font-semibold text-[13px] transition-base hover:bg-primary-hover"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Book a call
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 justify-center rounded-pill border border-line bg-white text-ink px-6 h-11 font-heading font-semibold text-[13px] transition-base hover:border-ink"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            View Pricings
          </a>
        </div>
      </div>

      {/* Stats row */}
      <dl className="relative mt-24 md:mt-40 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="font-heading font-bold text-3xl md:text-5xl text-ink tracking-tight">{s.num}</dt>
            <dd className="mt-2 text-xs md:text-[13px] text-mute font-body">{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Hero;