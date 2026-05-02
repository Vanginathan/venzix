import { Monitor, Search, Rocket, Zap, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Website Design & Development",
    desc: "Custom-built sites that look great, load fast, and convert visitors into clients.",
  },
  {
    icon: Search,
    title: "Google Business Optimisation",
    desc: "Show up in local search and Maps with a fully optimised Business Profile.",
  },
  {
    icon: Rocket,
    title: "Landing Page Builds",
    desc: "High-converting single pages for product launches, ads, and lead gen.",
  },
  {
    icon: Zap,
    title: "SEO & Speed Optimisation",
    desc: "Technical SEO, Core Web Vitals fixes, and content tuning for organic growth.",
  },
];

const Services = () => (
  <section id="services" className="py-24 md:py-32 bg-white">
    <div className="container">
      <div className="max-w-2xl">
        <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">Services</p>
        <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
          Everything your business needs to win online.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {services.map(({ icon: Icon, title, desc }) => (
          <article
            key={title}
            className="group bg-white border border-line rounded-lg p-8 tilt-card hover:border-ink/20"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-md border border-line flex items-center justify-center text-ink">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <ArrowUpRight className="h-5 w-5 text-mute group-hover:text-ink transition-base" />
            </div>
            <h3 className="mt-6 font-heading font-bold text-xl text-ink">{title}</h3>
            <p className="mt-2 font-body text-[15px] text-mute leading-relaxed">{desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;