import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "₹24,999",
    desc: "A clean 3-page site for small businesses ready to go online.",
    features: ["3-page custom design", "Mobile-first responsive", "Contact form + WhatsApp", "Basic on-page SEO", "Delivered in 5 days"],
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Growth",
    price: "₹59,999",
    desc: "A 7-page conversion-focused site with the works.",
    features: ["Everything in Starter", "Up to 7 custom pages", "Blog / CMS setup", "Google Analytics + Search Console", "Lead capture + automations", "30 days post-launch support"],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Custom",
    price: "Let's talk",
    desc: "E-commerce, integrations, multi-language, or web apps.",
    features: ["Custom scope & timeline", "E-commerce / multi-language", "Third-party integrations", "Dedicated project manager", "Ongoing maintenance plans"],
    cta: "Book a Discovery Call",
    featured: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="py-20 md:py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-surface-dark">
          Simple plans, no surprises
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.name}
            className={cn(
              "rounded-xl border p-8 bg-card shadow-card hover:shadow-card-hover transition-base flex flex-col",
              p.featured && "border-primary ring-2 ring-primary/15 relative"
            )}
          >
            {p.featured && (
              <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-surface-dark">{p.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-surface-dark">{p.price}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button asChild className="mt-8 w-full" variant={p.featured ? "default" : "outline"}>
              <a href="#contact">{p.cta}</a>
            </Button>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
        All plans include a free 30-minute discovery call, HTTPS SSL, mobile-first design, and basic Google Search submission.
      </p>
    </div>
  </section>
);

export default Pricing;
