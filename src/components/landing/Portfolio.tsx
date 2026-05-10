// src/components/landing/Portfolio.tsx
// FIX: Mobile users now always see project title/tag — not just on hover.
// The hover overlay is enhanced for desktop. Mobile gets a static bottom bar.
import { useMemo, useState, useEffect, useRef } from "react";
import wTn      from "@/assets/work-tn-fencing.png";
import wVelavan from "@/assets/work-velavan.png";
import wVelvera from "@/assets/work-velvera.png";
import wVela    from "@/assets/work-vela.png";
import wMakro   from "@/assets/work-makro.png";
import wAgentra from "@/assets/work-agentra.png";

type Category = "All" | "E-Commerce" | "Local Business" | "Landing Pages";

const projects: {
  img: string;
  title: string;
  tag: string;
  category: Exclude<Category, "All">;
  url: string;
}[] = [
  { img: wTn,      title: "TN Fencing Works",           tag: "Local Business",   category: "Local Business",  url: "https://tn-fencing-works.vercel.app/" },
  { img: wVelavan, title: "Sri Velavan Thirumana Mahal", tag: "Wedding Hall",     category: "Local Business",  url: "https://velavan-thirumana-hall.lovable.app/" },
  { img: wVelvera, title: "Velvéra Salon",              tag: "Beauty & Salon",   category: "Local Business",  url: "https://velvera.framer.website/" },
  { img: wVela,    title: "Vela Interiors",             tag: "Luxury Interiors", category: "Landing Pages",   url: "https://vela.framer.website/" },
  { img: wMakro,   title: "Makro Finance",              tag: "AI SaaS",          category: "Landing Pages",   url: "https://makro.framer.website/" },
  { img: wAgentra, title: "Agentra",                    tag: "AI Agents",        category: "Landing Pages",   url: "https://agentra-wbs.framer.website/" },
];

const filters: Category[] = ["All", "E-Commerce", "Local Business", "Landing Pages"];

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".port-card");
    if (!cards) return;
    cards.forEach((card, i) => {
      card.style.opacity    = "0";
      card.style.transform  = "translateY(20px)";
      card.style.transition = "none";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          card.style.transition = `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`;
          card.style.opacity    = "1";
          card.style.transform  = "translateY(0)";
        })
      );
    });
  }, [active]);

  return (
    <section id="work" className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl reveal">
            <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">
              Selected work
            </p>
            <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
              Sites built to win the next client.
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="reveal flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={
                  "rounded-pill px-4 h-9 text-[13px] font-body font-medium border press " +
                  (active === f
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-body border-line hover:border-ink hover:text-ink")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${p.title} live site`}
              className="port-card group relative rounded-lg overflow-hidden bg-tile block focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.title} — ${p.tag}`}
                  loading="lazy"
                  width={400}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              {/* Always-visible bottom bar (title + tag) */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent p-4 pt-10">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-[14px] text-white leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-white/70 mt-0.5">{p.tag}</p>
                  </div>
                  {/* Visit arrow — appears on hover */}
                  <span className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-pill bg-white text-ink px-2.5 py-1 text-[11px] font-body font-semibold inline-flex items-center gap-1">
                    Visit
                    <svg
                      width="10" height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;