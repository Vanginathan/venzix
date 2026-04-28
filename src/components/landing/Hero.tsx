import p1 from "@/assets/tile-hero-ui.jpg";
import p2 from "@/assets/tile-dashboard.jpg";
import p3 from "@/assets/tile-typography.jpg";
import p4 from "@/assets/tile-ecommerce.jpg";
import p5 from "@/assets/tile-app.jpg";
import p6 from "@/assets/tile-palette.jpg";

/**
 * Hero — Editorial mosaic with award-winning website tiles.
 * Layout: 7-col × 5-row background grid of light placeholder tiles.
 * Image tiles are constrained to the LEFT two columns (1-2) and
 * the RIGHT two columns (6-7). The center column band (cols 3-5)
 * is reserved for headline/CTA — never overlapped by tiles.
 * No people / faces — only web design, UI, and editorial visuals.
 */

// Image tiles — strictly side columns only (cols 1,2,6,7).
const tiles: { col: number; row: number; src: string; alt: string }[] = [
  { col: 1, row: 2, src: p1, alt: "Award-winning website hero UI" },
  { col: 2, row: 3, src: p2, alt: "Analytics dashboard interface" },
  { col: 1, row: 4, src: p3, alt: "Editorial typography specimen" },
  { col: 7, row: 2, src: p4, alt: "E-commerce product page UI" },
  { col: 6, row: 3, src: p5, alt: "Mobile app onboarding mockup" },
  { col: 7, row: 4, src: p6, alt: "Design system color palette" },
];

const stats = [
  { num: "300k", label: "New users" },
  { num: "76M", label: "Assets Secured" },
  { num: "10+", label: "Years of experience" },
  { num: "98%", label: "Customer satisfaction" },
];

const Hero = () => (
  <section id="hero" className="relative w-full bg-white rounded-[28px] overflow-hidden">
    {/* Background placeholder grid (7 cols × 5 rows). Side columns hold image tiles, center band stays clear. */}
    <div
      aria-hidden
      className="absolute inset-0 hidden md:grid gap-3 md:gap-4 p-6 md:p-10 pt-28 md:pt-32"
      style={{
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(5, minmax(80px, 1fr))",
      }}
    >
      {Array.from({ length: 7 * 5 }).map((_, i) => {
        const col = (i % 7) + 1;
        // Hide the center band (cols 3-5) entirely so nothing sits behind text.
        const inCenter = col >= 3 && col <= 5;
        if (inCenter) return <div key={i} />;
        return (
          <div
            key={i}
            className="rounded-2xl bg-tile/60 border border-line/60 tile-in"
            style={{ animationDelay: `${i * 30}ms` }}
          />
        );
      })}
    </div>

    {/* Image tiles — only in side columns 1,2,6,7 */}
    <div
      aria-hidden
      className="absolute inset-0 hidden md:grid gap-3 md:gap-4 p-6 md:p-10 pt-28 md:pt-32 pointer-events-none"
      style={{
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(5, minmax(80px, 1fr))",
      }}
    >
      {tiles.map((t, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden shadow-card-hover tile-in bg-white"
          style={{
            gridColumn: `${t.col} / span 1`,
            gridRow: `${t.row} / span 1`,
            animationDelay: `${300 + i * 120}ms`,
          }}
        >
          <img src={t.src} alt={t.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      ))}
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