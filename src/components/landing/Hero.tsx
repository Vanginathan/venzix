/**
 * Hero — Unique asymmetric scatter.
 * Hand-placed soft tiles of varied sizes & subtle rotations frame the
 * centered headline. No repeating grid — each tile is intentional.
 */

// Decorative tiles positioned with %-based coords so they scale with the section.
// Each tile: x/y are top-left %, w/h are size %, r is rotation deg, o is opacity.
type Tile = { x: number; y: number; w: number; h: number; r: number; o: number; d: number };
const TILES: Tile[] = [
  // Left cluster
  { x: 4,  y: 18, w: 9,  h: 14, r: -6, o: 0.55, d: 0   },
  { x: 2,  y: 48, w: 12, h: 18, r:  4, o: 0.7,  d: 80  },
  { x: 14, y: 70, w: 7,  h: 11, r: -3, o: 0.45, d: 160 },
  // Right cluster
  { x: 86, y: 14, w: 10, h: 15, r:  5, o: 0.6,  d: 40  },
  { x: 80, y: 44, w: 14, h: 20, r: -4, o: 0.75, d: 120 },
  { x: 90, y: 74, w: 6,  h: 10, r:  3, o: 0.4,  d: 200 },
  // Top accents
  { x: 26, y: 6,  w: 5,  h: 8,  r:  8, o: 0.35, d: 220 },
  { x: 70, y: 8,  w: 4,  h: 7,  r: -7, o: 0.35, d: 240 },
  // Bottom subtle
  { x: 38, y: 88, w: 6,  h: 9,  r: -2, o: 0.3,  d: 260 },
  { x: 58, y: 90, w: 5,  h: 8,  r:  4, o: 0.3,  d: 280 },
];

const stats = [
  { num: "300k", label: "New users" },
  { num: "76M", label: "Assets Secured" },
  { num: "10+", label: "Years of experience" },
  { num: "98%", label: "Customer satisfaction" },
];

const Hero = () => (
  <section id="hero" className="relative w-full bg-white rounded-[28px] overflow-hidden">
    {/* Soft radial wash for depth */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 38%, hsl(var(--background)) 0%, transparent 70%)",
      }}
    />

    {/* Faint dotted texture — unique, not a grid of squares */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(hsl(var(--line)) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 35%, black 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 35%, black 75%)",
      }}
    />

    {/* Hand-placed asymmetric tiles framing the headline */}
    <div aria-hidden className="absolute inset-0 hidden md:block">
      {TILES.map((t, i) => (
        <div
          key={i}
          className="absolute rounded-2xl bg-tile/60 border border-line/60 tile-in"
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
            width: `${t.w}%`,
            height: `${t.h}%`,
            transform: `rotate(${t.r}deg)`,
            opacity: t.o,
            animationDelay: `${t.d}ms`,
          }}
        />
      ))}

      {/* Two thin horizontal hairlines as editorial accents */}
      <div className="absolute left-[6%] right-[6%] top-[8%] h-px bg-line/70" />
      <div className="absolute left-[6%] right-[6%] bottom-[6%] h-px bg-line/70" />
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