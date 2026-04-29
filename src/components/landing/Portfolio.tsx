import { useMemo, useState } from "react";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";
import wTn from "@/assets/work-tn-fencing.png";

type Category = "All" | "E-Commerce" | "Local Business" | "Landing Pages";

const projects: { img: string; title: string; tag: string; outcome: string; category: Exclude<Category, "All"> }[] = [
  { img: wTn, title: "TN Fencing Works", tag: "Local Business", outcome: "500+ landowners served", category: "Local Business" },
  { img: w1, title: "Aroma Cafe",      tag: "Restaurant",  outcome: "+38% direct bookings", category: "Local Business" },
  { img: w2, title: "Madras Threads",  tag: "E-commerce",  outcome: "2× conversion rate",   category: "E-Commerce" },
  { img: w3, title: "Lotus Clinic",    tag: "Healthcare",  outcome: "Ranks #2 locally",     category: "Local Business" },
  { img: w4, title: "PixelForge SaaS", tag: "Startup",     outcome: "Shipped in 5 days",    category: "Landing Pages" },
  { img: w5, title: "Stillpoint Yoga", tag: "Wellness",    outcome: "2× trial signups",     category: "Local Business" },
  { img: w6, title: "Marina Estates",  tag: "Real Estate", outcome: "Custom CMS launch",    category: "E-Commerce" },
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
                  "rounded-pill px-4 h-9 text-[13px] font-body font-medium border transition-base " +
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
            <article
              key={p.title}
              className="group relative rounded-tile overflow-hidden bg-tile animate-fade-up"
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
                  <span className="rounded-pill bg-white text-ink px-3 py-1 text-[11px] font-body font-semibold whitespace-nowrap">
                    {p.outcome}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;