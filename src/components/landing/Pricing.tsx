import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "₹12,000",
    sub: "one-time",
    desc: "Local shops, individuals, freelancers",
    features: [
      "Up to 5 pages (Home, About, Services, Contact)",
      "Mobile responsive design",
      "Google Business Profile setup",
      "Contact form + WhatsApp button",
      "Basic on-page SEO",
      "Vercel deployment + GitHub setup",
      "1 month free support",
    ],
    delivery: "Delivery: 4–6 days",
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Growth",
    price: "₹28,000",
    sub: "one-time",
    desc: "Restaurants, clinics, service businesses",
    features: [
      "Up to 12 pages + Blog / News section",
      "Everything in Starter",
      "Dynamic CMS (editable content)",
      "Local SEO setup (keywords + metadata)",
      "Google Maps + Reviews integration",
      "Google Analytics + Search Console",
      "Performance & speed optimization",
      "3 months free support",
    ],
    delivery: "Delivery: 7–12 days",
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Pro",
    price: "₹50,000",
    sub: "one-time",
    desc: "Established businesses, startups",
    features: [
      "E-commerce store (unlimited products)",
      "Everything in Growth",
      "Payment gateway (Razorpay/UPI)",
      "Admin dashboard for orders",
      "Advanced local SEO + sitemap",
      "Booking system or custom feature",
      "6 months free support + maintenance",
    ],
    delivery: "Delivery: 14–20 days",
    cta: "Choose Pro",
    featured: false,
  },
  {
    name: "Custom",
    price: "₹80,000+",
    sub: "quoted",
    desc: "Complex projects, special requirements",
    features: [
      "Multi-language or multi-location sites",
      "Advanced automation & integrations",
      "Custom web app features",
      "Priority support & dedicated calls",
      "SLA-backed delivery timeline",
    ],
    delivery: "Timeline: Discussed on call",
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

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            <p className="mt-2 font-body text-[14px] text-mute">{p.desc}</p>
            <div className="mt-4">
              <div className="font-heading font-bold text-[44px] leading-none text-ink">{p.price}</div>
              <div className="mt-1 text-[13px] text-mute font-body">{p.sub}</div>
            </div>

            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 font-body text-[14px] text-body">
                  <Check className="h-4 w-4 text-ink mt-0.5 shrink-0" strokeWidth={2.4} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <span className="mt-6 inline-flex self-start rounded-pill bg-surface text-body px-3 py-1 font-body text-[12px]">
              {p.delivery}
            </span>

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