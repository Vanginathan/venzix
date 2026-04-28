import p1 from "@/assets/portrait-1.jpg";
import p2 from "@/assets/portrait-2.jpg";
import p3 from "@/assets/portrait-3.jpg";
import p4 from "@/assets/portrait-4.jpg";
import p5 from "@/assets/portrait-5.jpg";

/**
 * Hero — Editorial grid mosaic (Image 1 reference)
 * - 7 columns × 5 rows of light tiles on a white card
 * - 5 portraits placed only in OUTER columns (1,2,6,7) so the centered
 *   headline (cols 3-5) is never overlapped
 * - Compact vertical rhythm so the stats row is visible above the fold
 */

// Outer-column portrait placements (col, row)
const portraits: { col: number; row: number; src: string; alt: string }[] = [
  { col: 2, row: 2, src: p1, alt: "Warm portrait" },
  { col: 6, row: 2, src: p2, alt: "Blue portrait" },
  { col: 2, row: 3, src: p3, alt: "Silhouette portrait" },
  { col: 6, row: 4, src: p4, alt: "Teal portrait" },
  { col: 4, row: 4, src: p5, alt: "Warm crop portrait" },
];

const stats = [
  { num: "300k", label: "New users" },
  { num: "76M", label: "Assets Secured" },
  { num: "10+", label: "Years of experience" },
  { num: "98%", label: "Customer satisfaction" },
];

const Hero = () => (
  <section id="hero" className="relative w-full bg-white rounded-[28px] overflow-hidden">
    {/* Mosaic grid (background tiles + portraits live in same grid) */}
    <div
      aria-hidden
      className="absolute inset-0 grid gap-2 md:gap-3 px-4 md:px-8 pt-24 md:pt-28 pb-6 md:pb-10"
      style={{
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(5, minmax(64px, 1fr))",
      }}
    >
      {Array.from({ length: 7 * 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-tile/70 border border-line/50 tile-in"
          style={{ animationDelay: `${i * 25}ms` }}
        />
      ))}

      {portraits.map((p, i) => (
        <div
          key={`p-${i}`}
          className="rounded-xl overflow-hidden shadow-card-hover tile-in pointer-events-none"
          style={{
            gridColumn: `${p.col} / span 1`,
            gridRow: `${p.row} / span 1`,
            animationDelay: `${300 + i * 100}ms`,
          }}
        >
          <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>

    {/* Foreground content — narrow column so it stays in cols 3-5 */}
    <div className="relative z-10 px-6 pt-28 md:pt-32 pb-8">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-[12px] text-mute font-body">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse-dot" />
          only 4 slots available
        </span>

        <h1 className="font-heading font-bold mt-3 text-3xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-ink">
          We Design simple and<br />high converting websites
        </h1>

        <p className="mt-4 text-[13px] md:text-sm text-mute font-body max-w-md mx-auto">
          we turn your ideas into high-impact digital experiences.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 justify-center rounded-pill bg-ink text-white px-5 h-10 font-heading font-semibold text-[13px] transition-base hover:bg-primary-hover"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Book a call
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 justify-center rounded-pill border border-line bg-white text-ink px-5 h-10 font-heading font-semibold text-[13px] transition-base hover:border-ink"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            View Pricings
          </a>
        </div>
      </div>

      {/* Stats row — sits below grid, compact spacing so it stays above the fold */}
      <dl className="relative mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto px-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="font-heading font-bold text-2xl md:text-4xl text-ink tracking-tight">{s.num}</dt>
            <dd className="mt-1 text-[11px] md:text-xs text-mute font-body">{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Hero;