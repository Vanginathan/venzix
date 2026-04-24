import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";

const projects = [
  { img: w1, title: "Aroma Cafe", tag: "Restaurant", blurb: "Online ordering + reservations site, +38% direct bookings." },
  { img: w2, title: "Madras Threads", tag: "E-commerce", blurb: "Shopify storefront launched in 10 days, 2x conversion." },
  { img: w3, title: "Lotus Clinic", tag: "Healthcare", blurb: "Appointment-first site, ranks #2 locally for 'dentist Anna Nagar'." },
  { img: w4, title: "PixelForge SaaS", tag: "Startup", blurb: "MVP marketing site shipped in 5 days for product launch." },
  { img: w5, title: "Stillpoint Yoga", tag: "Wellness", blurb: "Class booking + content hub, doubled trial signups." },
  { img: w6, title: "Marina Estates", tag: "Real Estate", blurb: "Property listings site with custom CMS for the agent team." },
];

const Portfolio = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Portfolio</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-surface-dark">
              Projects we are proud of
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <article
              key={p.title}
              className="group rounded-xl overflow-hidden border bg-card shadow-card hover:shadow-card-hover transition-base animate-fade-in-up"
              style={{ animationDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={p.img}
                  alt={`${p.title} website`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover group-hover:scale-105 transition-base"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.tag}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-base" />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-surface-dark">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
              </div>
            </article>
          ))}
        </div>

        {!showAll && (
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" onClick={() => setShowAll(true)}>
              Load More Work
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
