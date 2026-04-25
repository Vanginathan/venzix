import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "₹24,999",
    sub: "starting from",
    desc: "A clean 3-page site for small businesses ready to go online.",
    features: ["3-page custom design", "Mobile-first responsive", "Contact form + WhatsApp", "On-page SEO basics", "Delivered in 5 days"],
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Growth",
    price: "₹59,999",
    sub: "starting from",
    desc: "A 7-page conversion-focused site, with the works.",
    features: ["Up to 7 custom pages", "Blog / CMS setup", "Google Analytics + Search Console", "Lead capture + automations", "30 days post-launch support"],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Custom",
    price: "Let’s talk",
    sub: "scoped to project",
    desc: "E-commerce, integrations, multi-language, or web apps.",
    features: ["Custom scope & timeline", "E-commerce / multi-language", "Third-party integrations", "Dedicated PM", "Ongoing maintenance plans"],
    cta: "Book a Discovery Call",
    featured: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="py-24 md:py-32 bg-white">
    <div className="container">
      <div className="max-w-2xl">
        <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">Pricing</p>
        <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
          Simple, fixed plans. No surprises.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.name}
            className={cn(
              "relative rounded-lg border bg-white p-8 flex flex-col transition-base",
              p.featured ? "border-ink border-2 lg:scale-[1.02]" : "border-line hover:shadow-card-hover"
            )}
          >
            {p.featured && (
              <span className="absolute -top-3 right-6 rounded-pill bg-ink text-white px-3 py-1 font-body font-semibold text-[11px] uppercase tracking-wider">
                Most Popular
              </span>
            )}
            <h3 className="font-heading font-bold text-lg text-ink">{p.name}</h3>
            <div className="mt-4">
              <div className="font-heading font-bold text-[44px] leading-none text-ink">{p.price}</div>
              <div className="mt-1 text-[13px] text-mute font-body">{p.sub}</div>
            </div>
            <p className="mt-4 font-body text-[14px] text-mute">{p.desc}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 font-body text-[14px] text-body">
                  <Check className="h-4 w-4 text-ink mt-0.5 shrink-0" strokeWidth={2.4} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={cn(
                "mt-8 inline-flex items-center justify-center rounded-md h-12 px-6 font-heading font-semibold text-[14px] transition-base",
                p.featured
                  ? "bg-ink text-white hover:bg-primary-hover"
                  : "border border-ink text-ink hover:bg-ink hover:text-white"
              )}
            >
              {p.cta}
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;