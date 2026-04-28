/**
 * Hero — Editorial scattered mosaic matching the reference design.
 * 9-col × 6-row background grid of soft placeholder squares only.
 * Headline + CTA zone (rows 1-3, cols 4-6) stays clear.
 */

// Reserved cells (col,row) the headline/CTA block sits over — keep empty.
const RESERVED = new Set<string>([
  "4,1","5,1","6,1",
  "4,2","5,2","6,2",
  "4,3","5,3","6,3",
]);

const stats = [
  { num: "300k", label: "New users" },
  { num: "76M", label: "Assets Secured" },
  { num: "10+", label: "Years of experience" },
  { num: "98%", label: "Customer satisfaction" },
];

const Hero = () => (
  <section id="hero" className="relative w-full bg-white rounded-[28px] overflow-hidden">
    {/* Scattered placeholder mosaic (9 × 6). Sparse — only some cells render a soft tile. */}
    <div
      aria-hidden
      className="absolute inset-0 hidden md:grid gap-3 md:gap-4 p-6 md:p-10 pt-28 md:pt-32"
      style={{
        gridTemplateColumns: "repeat(9, 1fr)",
        gridTemplateRows: "repeat(6, minmax(70px, 1fr))",
      }}
    >
      {Array.from({ length: 9 * 6 }).map((_, i) => {
        const col = (i % 9) + 1;
        const row = Math.floor(i / 9) + 1;
        const key = `${col},${row}`;
        if (RESERVED.has(key)) return <div key={i} />;
        // Sparse pattern: render a soft empty tile only on a checkerboard-ish subset.
        const show = (col + row) % 2 === 0 || col === 1 || col === 9;
        if (!show) return <div key={i} />;
        return (
          <div
            key={i}
            className="rounded-2xl bg-tile/70 border border-line/60 tile-in"
            style={{ animationDelay: `${i * 25}ms` }}
          />
        );
      })}
    </div>

    {/* Foreground content */}
    <div className="relative z-10 px-6 pt-32 md:pt-40 pb-12 md:pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-[13px] text-mute font-body">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse-dot" />
          only 4 slots available
        </span>

        <h1 className="font-heading font-bold mt-4 text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink">
          We Design simple and<br />high converting websites
        </h1>

        <p className="mt-5 text-sm md:text-base text-mute font-body max-w-xl mx-auto">
          we turn your ideas into high-impact digital experiences.
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