import { useMemo, useState } from "react";
import wTn from "@/assets/work-tn-fencing.png";
import wVelavan from "@/assets/work-velavan.png";
import wVelvera from "@/assets/work-velvera.png";
import wVela from "@/assets/work-vela.png";
import wMakro from "@/assets/work-makro.png";
import wAgentra from "@/assets/work-agentra.png";

type Category = "All" | "E-Commerce" | "Local Business" | "Landing Pages";

const projects: { img: string; title: string; tag: string; outcome: string; category: Exclude<Category, "All">; url: string }[] = [
  { img: wTn,      title: "TN Fencing Works",         tag: "Local Business",  outcome: "500+ landowners served", category: "Local Business", url: "https://tn-fencing-works.vercel.app/" },
  { img: wVelavan, title: "Sri Velavan Thirumana Mahal", tag: "Wedding Hall", outcome: "Bookings & gallery site", category: "Local Business", url: "https://velavan-thirumana-hall.lovable.app/" },
  { img: wVelvera, title: "Velvéra Salon",            tag: "Beauty & Salon",  outcome: "32k+ happy customers",   category: "Local Business", url: "https://velvera.framer.website/" },
  { img: wVela,    title: "Vela Interiors",           tag: "Luxury Interiors",outcome: "Award-winning designs",  category: "Landing Pages",  url: "https://vela.framer.website/" },
  { img: wMakro,   title: "Makro Finance",            tag: "AI SaaS",         outcome: "AI-powered cashflow",    category: "Landing Pages",  url: "https://makro.framer.website/" },
  { img: wAgentra, title: "Agentra",                  tag: "AI Agents",       outcome: "Autonomous workflows",   category: "Landing Pages",  url: "https://agentra-wbs.framer.website/" },
];

const filters: Category[] = ["All", "E-Commerce", "Local Business", "Landing Pages"];

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");
  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="work" className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">Selected work</p>
            <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
              Sites built to win the next client.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${p.title} live site`}
              className="group relative rounded-tile overflow-hidden bg-tile animate-fade-up block focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              style={{ animationDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.title} — ${p.tag}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-ink/90 to-transparent p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-[16px] text-white">{p.title}</h3>
                    <p className="text-[12px] text-white/70">{p.tag}</p>
                  </div>
                  <span className="rounded-pill bg-white text-ink px-3 py-1 text-[11px] font-body font-semibold whitespace-nowrap inline-flex items-center gap-1">
                    Visit site
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
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