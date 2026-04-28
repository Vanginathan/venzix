import p1 from "@/assets/tile-website.jpg";
import p2 from "@/assets/tile-code.jpg";
import p3 from "@/assets/tile-wireframe.jpg";
import p4 from "@/assets/tile-mobile.jpg";
import p5 from "@/assets/tile-designsystem.jpg";

/**
 * Hero — Editorial grid with scattered blurred portraits.
 * Background: subtle 6×5 grid of square placeholder tiles.
 * Overlay: 5 portraits at fixed grid cells (slightly larger than a cell, rounded).
 * Foreground: centered headline, badge, CTAs.
 * Below: stats row.
 */

// Portrait positions on the 6-col × 5-row grid (col, row, image, alt)
const portraits: { col: number; row: number; src: string; alt: string }[] = [
  { col: 2, row: 2, src: p1, alt: "Modern website on laptop" },
  { col: 6, row: 2, src: p2, alt: "Code editor with HTML and CSS" },
  { col: 2, row: 3, src: p3, alt: "UI wireframe canvas" },
  { col: 6, row: 3, src: p4, alt: "Mobile app interface mockup" },
  { col: 4, row: 4, src: p5, alt: "Design system typography and color palette" },
];

const stats = [
  { num: "300k", label: "New users" },
  { num: "76M", label: "Assets Secured" },
  { num: "10+", label: "Years of experience" },
  { num: "98%", label: "Customer satisfaction" },
];

const Hero = () => (
  <section id="hero" className="relative w-full bg-white rounded-[28px] overflow-hidden">
    {/* Background placeholder grid */}
    <div
      aria-hidden
      className="absolute inset-0 grid gap-3 md:gap-4 p-6 md:p-10 pt-28 md:pt-32"
      style={{
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(5, minmax(80px, 1fr))",
      }}
    >
      {Array.from({ length: 7 * 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-tile/60 border border-line/60 tile-in"
          style={{ animationDelay: `${i * 30}ms` }}
        />
      ))}
    </div>

    {/* Scattered portraits — desktop only for clarity */}
    <div
      aria-hidden
      className="absolute inset-0 hidden md:grid gap-3 md:gap-4 p-6 md:p-10 pt-28 md:pt-32 pointer-events-none"
      style={{
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(5, minmax(80px, 1fr))",
      }}
    >
      {portraits.map((p, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden shadow-card-hover tile-in"
          style={{
            gridColumn: `${p.col} / span 1`,
            gridRow: `${p.row} / span 1`,
            animationDelay: `${300 + i * 120}ms`,
          }}
        >
          <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
        </div>
      ))}
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