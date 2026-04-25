import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";

/**
 * Hero — Grid Mosaic.
 * 14 tiles laid out on a 6-col × 5-row CSS grid covering the full viewport.
 * 6 image tiles (real project shots) + 8 light-grey placeholder tiles.
 * Each tile fades and scales in with an 80ms staggered delay.
 * A centred overlay holds the availability badge, headline, CTAs, and stats.
 */

type Tile = {
  /** grid-area: row-start / col-start / row-end / col-end */
  area: string;
  img?: string;
  alt?: string;
};

// 6 columns × 5 rows. Tiles vary in size; some are placeholders.
const tiles: Tile[] = [
  { area: "1 / 1 / 3 / 2", img: w1, alt: "Aroma Cafe website" },
  { area: "1 / 2 / 2 / 3" },
  { area: "1 / 3 / 2 / 5", img: w2, alt: "Madras Threads e-commerce" },
  { area: "1 / 5 / 3 / 6" },
  { area: "1 / 6 / 2 / 7", img: w3, alt: "Lotus Clinic site" },
  { area: "2 / 2 / 4 / 3", img: w4, alt: "PixelForge launch site" },
  { area: "2 / 6 / 4 / 7" },
  { area: "3 / 1 / 5 / 2", img: w5, alt: "Stillpoint Yoga site" },
  { area: "3 / 3 / 4 / 4" },
  { area: "3 / 4 / 4 / 5" },
  { area: "4 / 2 / 5 / 4", img: w6, alt: "Marina Estates site" },
  { area: "4 / 4 / 5 / 6" },
  { area: "4 / 6 / 5 / 7" },
  { area: "5 / 1 / 6 / 7" }, // bottom strip
];

const stats = [
  { num: "120+", label: "Projects delivered" },
  { num: "94%", label: "Client retention" },
  { num: "1.2s", label: "Avg. load time" },
  { num: "8 yrs", label: "In business" },
];

const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen w-full overflow-hidden bg-background pt-20"
  >
    {/* Mosaic layer */}
    <div
      aria-hidden
      className="absolute inset-0 p-4 md:p-6 grid gap-3 md:gap-4 hidden md:grid"
      style={{
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
      }}
    >
      {tiles.map((t, i) => (
        <div
          key={i}
          className="rounded-tile overflow-hidden bg-tile tile-in"
          style={{
            gridArea: t.area,
            animationDelay: `${i * 80}ms`,
          }}
        >
          {t.img && (
            <img
              src={t.img}
              alt={t.alt ?? ""}
              loading="eager"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}
    </div>

    {/* Mobile mosaic — simplified 2-col grid */}
    <div
      aria-hidden
      className="absolute inset-0 p-3 grid gap-2 md:hidden"
      style={{
        gridTemplateColumns: "repeat(2, 1fr)",
        gridAutoRows: "minmax(70px, 1fr)",
      }}
    >
      {[w1, undefined, w2, w3, undefined, w4, w5, undefined].map((src, i) => (
        <div
          key={i}
          className="rounded-tile overflow-hidden bg-tile tile-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {src && <img src={src} alt="" className="h-full w-full object-cover" />}
        </div>
      ))}
    </div>

    {/* Soft white scrim so the centre overlay reads cleanly over the mosaic */}
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/80 to-white/30 pointer-events-none"
    />

    {/* Centre overlay */}
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-line bg-white/80 backdrop-blur text-[13px] text-mute font-body">
          <span className="h-1.5 w-1.5 rounded-full bg-mute animate-pulse-dot" />
          Only 3 project slots open this month
        </span>

        <h1 className="font-display mt-6 text-5xl md:text-7xl leading-[1.05] text-ink">
          We build websites that convert visitors into paying clients.
        </h1>

        <p className="mt-6 text-base md:text-lg text-mute font-body max-w-2xl mx-auto">
          From Google Business to booked calls — we handle the full digital presence for local businesses and growing startups in Chennai.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-pill bg-ink text-white px-7 h-12 font-heading font-semibold text-sm transition-base hover:scale-[1.02] hover:bg-primary-hover"
          >
            Book a Free Call
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-pill border border-ink text-ink bg-white/80 backdrop-blur px-7 h-12 font-heading font-semibold text-sm transition-base hover:bg-ink hover:text-white"
          >
            View Our Work
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="font-heading font-bold text-2xl md:text-3xl text-ink">{s.num}</dt>
              <dd className="mt-1 text-[13px] text-mute font-body">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

export default Hero;