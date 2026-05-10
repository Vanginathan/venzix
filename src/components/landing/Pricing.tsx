// src/components/landing/Pricing.tsx

import React from "react";
import { Check, Clock, Phone, Zap, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTH = new Date().toLocaleString("en-IN", {
  month: "long",
});

type Feature = {
  text: string;
  highlight?: boolean;
};

type Plan = {
  name: string;
  price: string;
  originalPrice?: string;
  sub: string;
  roi?: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  features: Feature[];
  notIncluded?: string[];
  delivery: string;
  deliveryDays: string;
  payment: string;
  cta: string;
  ctaSecondary?: string;
  featured: boolean;
  icon: React.ReactNode;
};

const PHONE = "917708201511";

const WA = (msg: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

const plans: Plan[] = [
  {
    name: "Starter",
    price: "₹12,000",
    sub: "one-time · no hidden fees",
    desc: "Perfect for local shops, kirana stores, tailors, tutors & solo professionals in Salem who need a clean online presence fast.",
    badge: "Best for shops",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <Zap className="h-5 w-5" />,
    features: [
      { text: "Up to 5 pages — Home, About, Services, Contact, Gallery" },
      { text: "Mobile-first design — looks great on any phone" },
      { text: "Google Business Profile setup", highlight: true },
      {
        text: "WhatsApp chat button — customers contact you instantly",
        highlight: true,
      },
      { text: "Contact form with email alerts" },
      { text: "On-page SEO — title tags, meta, headings" },
      { text: "Free domain connection (you buy domain)" },
      { text: "Vercel hosting — fast, always online" },
      { text: "1 month free support after launch" },
    ],
    notIncluded: [
      "CMS / content editing without developer",
      "Blog or news section",
      "E-commerce or payments",
    ],
    delivery: "Live in 4–6 days",
    deliveryDays: "4–6",
    payment: "₹6,000 now · ₹6,000 on launch",
    cta: "Start my website",
    featured: false,
  },

  {
    name: "Growth",
    price: "₹28,000",
    originalPrice: "₹35,000",
    sub: "one-time · no hidden fees",
    roi: "Salem restaurant owners recover this in 3–4 new table bookings. Clinic owners in 1–2 new patients.",
    desc: "For restaurants, clinics, salons, coaching centres & service businesses in Salem and nearby towns ready to get serious leads.",
    badge: "Most Popular",
    badgeColor: "bg-ink text-white border-ink",
    icon: <Star className="h-5 w-5" />,
    features: [
      { text: "Up to 12 pages + Blog / News section", highlight: true },
      { text: "Everything in Starter — fully included" },
      {
        text: "CMS — edit your own content without a developer",
        highlight: true,
      },
      {
        text: "Local SEO — keywords, schema & metadata for Salem searches",
        highlight: true,
      },
      { text: "Google Maps embed + Google Reviews widget" },
      { text: "Google Analytics + Search Console setup" },
      { text: "Core Web Vitals & speed optimisation" },
      { text: "WhatsApp Business API integration" },
      { text: "Instagram / social media feed embed" },
      {
        text: "3 months free support + 2 free content edits",
        highlight: true,
      },
    ],
    notIncluded: ["Payment gateway / online store", "Booking system"],
    delivery: "Live in 7–12 days",
    deliveryDays: "7–12",
    payment: "₹14,000 now · ₹14,000 on launch",
    cta: "Choose Growth",
    ctaSecondary: "WhatsApp to discuss",
    featured: true,
  },

  {
    name: "Pro",
    price: "₹55,000",
    sub: "one-time · no hidden fees",
    desc: "For established Salem & Chennai businesses, startups and e-commerce shops ready to sell online and scale revenue.",
    badge: "Best for e-commerce",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: <Shield className="h-5 w-5" />,
    features: [
      {
        text: "Full e-commerce store — unlimited products",
        highlight: true,
      },
      { text: "Everything in Growth — fully included" },
      {
        text: "Razorpay + UPI + COD payment gateway",
        highlight: true,
      },
      { text: "Admin dashboard — manage orders & inventory" },
      { text: "Product search, filters & categories" },
      { text: "Coupon codes & discount engine" },
      { text: "Advanced local SEO + XML sitemap + schema" },
      {
        text: "Online booking / appointment system",
        highlight: true,
      },
      { text: "Automated order confirmation emails & SMS" },
      {
        text: "6 months free support + maintenance",
        highlight: true,
      },
      {
        text: "1 free redesign of any section within 6 months",
      },
    ],
    notIncluded: [],
    delivery: "Live in 14–21 days",
    deliveryDays: "14–21",
    payment: "₹27,500 now · ₹27,500 on launch",
    cta: "Choose Pro",
    ctaSecondary: "WhatsApp to discuss",
    featured: false,
  },

  {
    name: "Custom",
    price: "₹1,00,000+",
    sub: "quoted after discovery call",
    desc: "Multi-city businesses, SaaS products, web apps, or any project needing custom logic, integrations, or advanced features.",
    badge: "Enterprise / Web Apps",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <Phone className="h-5 w-5" />,
    features: [
      {
        text: "Multi-language or multi-location websites",
        highlight: true,
      },
      { text: "Custom web application — any feature you need" },
      {
        text: "Third-party API & automation integrations",
        highlight: true,
      },
      { text: "Advanced admin panel & role management" },
      {
        text: "Real-time features — chat, notifications, dashboards",
      },
      {
        text: "Priority support with dedicated WhatsApp group",
      },
      {
        text: "SLA-backed delivery with milestone tracking",
      },
      {
        text: "Full source code handover + documentation",
      },
    ],
    notIncluded: [],
    delivery: "Timeline on discovery call",
    deliveryDays: "Custom",
    payment: "Milestone-based payments",
    cta: "Book discovery call",
    featured: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-surface py-24 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="reveal max-w-2xl">
          <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">
            Transparent pricing
          </p>

          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-ink md:text-[42px]">
            Fixed price. You own everything.
            <br />
            <span className="font-serif-display text-ink/80">
              No surprises, ever.
            </span>
          </h2>

          <p className="mt-3 max-w-xl font-body text-[15px] text-mute">
            Every plan is a one-time investment — no monthly fees, no retainers.
            Domain, hosting setup and source code are fully handed over to you
            at launch. Prices set for Salem, Erode, Namakkal & nearby towns.
          </p>
        </div>

        {/* Trust / scarcity */}
        <div className="reveal mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-pill border border-amber-200 bg-amber-50 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>

            <span className="font-body text-[13px] font-medium text-amber-800">
              Only 4 slots left for {MONTH}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-2">
            <Check className="h-3.5 w-3.5 text-ink" strokeWidth={2.5} />
            <span className="font-body text-[13px] text-body">
              60+ websites delivered across Tamil Nadu
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-2">
            <Check className="h-3.5 w-3.5 text-ink" strokeWidth={2.5} />
            <span className="font-body text-[13px] text-body">
              50% upfront · 50% on launch day
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => (
            <article
              key={p.name}
              data-stagger={i}
              className={cn(
                "reveal relative flex flex-col overflow-hidden rounded-lg border bg-white",
                p.featured
                  ? "z-10 border-2 border-ink shadow-xl-custom lg:scale-[1.03]"
                  : "border-line hover-lift"
              )}
            >
              {/* Top section */}
              <div
                className={cn(
                  "px-6 pb-5 pt-6",
                  p.featured ? "bg-ink text-white" : "bg-white"
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center rounded-pill border px-2.5 py-0.5 font-body text-[11px] font-semibold",
                    p.featured
                      ? "border-white/30 bg-white/15 text-white"
                      : p.badgeColor
                  )}
                >
                  {p.badge}
                </span>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      p.featured
                        ? "bg-white/20 text-white"
                        : "bg-ink/8 text-ink"
                    )}
                  >
                    {p.icon}
                  </span>

                  <h3
                    className={cn(
                      "font-heading text-xl font-bold",
                      p.featured ? "text-white" : "text-ink"
                    )}
                  >
                    {p.name}
                  </h3>
                </div>

                <div className="mt-3 flex items-end gap-2">
                  <span
                    className={cn(
                      "font-heading text-[36px] font-bold leading-none tracking-tight",
                      p.featured ? "text-white" : "text-ink"
                    )}
                  >
                    {p.price}
                  </span>

                  {p.originalPrice && (
                    <span className="mb-1 font-body text-[14px] text-white/50 line-through">
                      {p.originalPrice}
                    </span>
                  )}
                </div>

                <p
                  className={cn(
                    "mt-0.5 font-body text-[12px]",
                    p.featured ? "text-white/60" : "text-mute"
                  )}
                >
                  {p.sub}
                </p>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col px-6 pb-6">
                <p className="mt-4 font-body text-[13px] leading-relaxed text-mute">
                  {p.desc}
                </p>

                {p.roi && (
                  <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5">
                    <p className="font-body text-[12px] leading-relaxed text-amber-800">
                      <strong className="text-amber-900">Real ROI:</strong>{" "}
                      {p.roi}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-mute" />
                  <span className="font-body text-[12px] text-mute">
                    {p.delivery}
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-4 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          f.highlight ? "text-ink" : "text-mute"
                        )}
                        strokeWidth={f.highlight ? 2.8 : 2}
                      />

                      <span
                        className={cn(
                          "font-body text-[13px] leading-snug",
                          f.highlight
                            ? "font-medium text-ink"
                            : "text-body"
                        )}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Not included */}
                {p.notIncluded && p.notIncluded.length > 0 && (
                  <div className="mt-4 border-t border-line pt-4">
                    <p className="mb-2 font-body text-[11px] uppercase tracking-wider text-mute">
                      Not included
                    </p>

                    <ul className="space-y-1.5">
                      {p.notIncluded.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line" />

                          <span className="font-body text-[12px] text-mute/70">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Payment */}
                <div className="mt-4 rounded-md border border-line bg-surface px-3 py-2">
                  <p className="font-body text-[12px] text-mute">
                    <strong className="text-ink">Payment:</strong>{" "}
                    {p.payment}
                  </p>
                </div>

                {/* Primary CTA */}
                <a
                  href="#contact"
                  className={cn(
                    "press mt-5 inline-flex h-11 w-full items-center justify-center rounded-md px-5 font-heading text-[14px] font-semibold transition-colors",
                    p.featured
                      ? "bg-ink text-white shadow-[0_4px_14px_hsl(0_0%_0%/0.20)] hover:bg-primary-hover"
                      : "border-2 border-ink text-ink hover:bg-ink hover:text-white"
                  )}
                >
                  {p.cta}
                </a>

                {/* Secondary CTA */}
                {p.ctaSecondary && (
                  <a
                    href={WA(
                      `Hi, I'm interested in the ${p.name} plan. Can we discuss?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-line px-5 font-body text-[13px] text-mute transition-colors hover:border-ink hover:text-ink"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current text-[#25D366]"
                      aria-hidden
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.27-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.36 13.65c-.18.5-.87.92-1.43 1.04-.38.08-.87.14-2.52-.54-2.12-.86-3.49-3.02-3.6-3.16-.1-.14-.84-1.12-.84-2.13 0-1.01.53-1.51.72-1.71.18-.2.4-.25.53-.25h.38c.12 0 .28-.05.44.33.17.4.57 1.39.62 1.49.05.1.08.22.02.35-.07.13-.1.21-.2.33l-.3.35c-.1.1-.2.21-.09.41.12.2.52.86 1.11 1.39.76.68 1.4.89 1.6.99.2.1.31.08.43-.05.12-.13.5-.58.63-.78.13-.2.27-.17.45-.1.18.07 1.16.55 1.36.65.2.1.33.15.38.23.05.09.05.5-.13 1z" />
                    </svg>

                    {p.ctaSecondary}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom trust strip */}
        <div className="reveal mt-10 flex flex-wrap items-center justify-between gap-6 rounded-lg border border-line bg-white px-6 py-5">
          <div className="flex flex-wrap gap-6">
            {[
              "All prices in INR incl. GST",
              "You own the domain, code & hosting",
              "UPI · Bank transfer · Razorpay accepted",
              "Free 30-min discovery call before you commit",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 font-body text-[13px] text-body"
              >
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-ink"
                  strokeWidth={2.5}
                />

                {item}
              </span>
            ))}
          </div>

          <a
            href={WA(
              "Hi, I want to discuss which plan is right for my business."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex h-10 shrink-0 items-center gap-2 rounded-pill bg-[#25D366] px-5 font-heading text-[13px] font-semibold text-white transition-colors hover:bg-[#20b858]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.27-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.36 13.65c-.18.5-.87.92-1.43 1.04-.38.08-.87.14-2.52-.54-2.12-.86-3.49-3.02-3.6-3.16-.1-.14-.84-1.12-.84-2.13 0-1.01.53-1.51.72-1.71.18-.2.4-.25.53-.25h.38c.12 0 .28-.05.44.33.17.4.57 1.39.62 1.49.05.1.08.22.02.35-.07.13-.1.21-.2.33l-.3.35c-.1.1-.2.21-.09.41.12.2.52.86 1.11 1.39.76.68 1.4.89 1.6.99.2.1.31.08.43-.05.12-.13.5-.58.63-.78.13-.2.27-.17.45-.1.18.07 1.16.55 1.36.65.2.1.33.15.38.23.05.09.05.5-.13 1z" />
            </svg>

            Not sure which plan? Ask us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;